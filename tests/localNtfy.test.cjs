const assert = require('node:assert/strict')
const { test } = require('node:test')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')

const credentials = {
  publishUrl: 'http://10.0.0.2:80',
  token: 'tk_test',
  topic: 'canary',
}
function result(topicName = 'topic') {
  return {
    version: '1',
    result: {
      type: 'group',
      value: [
        ...Object.entries(credentials).map(([name, value]) => ({
          type: 'single',
          name: name === 'topic' ? topicName : name,
          value,
        })),
        { type: 'single', name: 'username', value: 'pkg_canary' },
      ],
    },
  }
}

function harness() {
  const state = {
    installed: true,
    started: true,
    stored: undefined,
    mints: 0,
    dependencies: {},
    result: result(),
    registered: false,
  }
  const cache = new Map()
  const storeJson = {
    read: (select) => ({
      once: async () => select({ ntfy: state.stored }),
      const: async () => select({ electrum: 'electrs' }),
    }),
    merge: async (_, patch) => {
      state.stored = patch.ntfy
    },
  }
  const sdk = {
    setupOnInit: (init) => ({ init }),
    setupInit: (...handlers) => handlers,
    setupUninit: () => {},
    setupDependencies: (fn) => async (effects) => {
      state.registered = false
      const deps = await fn({ effects })
      await Promise.resolve()
      state.dependencies = deps
      state.registered = true
    },
    host: { get: () => ({ const: async () => state.installed }) },
    getStatus: () => ({
      const: async () => (state.installed ? { started: state.started } : null),
    }),
  }
  const effects = {
    action: {
      getInput: async () => ({ eventId: 'saved-input' }),
      run: async (params) => {
        assert.equal(
          state.registered,
          true,
          'registration must finish before action execution',
        )
        assert.ok(state.dependencies.ntfy, 'ntfy must be a current dependency')
        assert.equal(params.procedureId, 'saved-input')
        state.mints++
        return state.result
      },
    },
  }
  function load(file) {
    if (cache.has(file)) return cache.get(file)
    const mocks = {
      '@start9labs/start-sdk': {},
      'ntfy-startos/startos/utils': { uiHostId: 'ui', uiInterfaceId: 'ui' },
      './sdk': { sdk },
      '../sdk': { sdk },
      './fileModels/store.json': { storeJson },
      '../fileModels/store.json': { storeJson },
      './actions/selectElectrum': { selectElectrum: {} },
      './i18n': { i18n: (s) => s },
      '../interfaces': { setInterfaces: async () => {} },
      '../versions': { versionGraph: async () => {} },
      '../actions': { actions: async () => {} },
      '../backups': { restoreInit: async () => {} },
      './seedFiles': { seedFiles: async () => {} },
      './watchCredentials': { watchCredentials: async () => {} },
    }
    const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText
    const exports = {}
    vm.runInNewContext(
      output,
      {
        exports,
        console: { warn() {} },
        require: (id) =>
          id in mocks
            ? mocks[id]
            : load(path.resolve(path.dirname(file), id + '.ts')),
      },
      { filename: file },
    )
    cache.set(file, exports)
    return exports
  }
  const local = load(path.resolve('startos/localNtfy.ts'))
  const { init } = load(path.resolve('startos/init/index.ts'))
  const reactive = init.at(-1)
  return {
    state,
    local,
    reactive: (kind = null) => reactive(effects, kind),
    init: async (kind) => {
      for (const handler of init)
        await (typeof handler === 'function'
          ? handler(effects, kind)
          : handler.init(effects, kind))
    },
  }
}

for (const localeTopic of ['topic', 'tema', 'Thema', 'temat', 'sujet']) {
  test(`provisions and caches translated result: ${localeTopic}`, async () => {
    const h = harness()
    h.state.result = result(localeTopic)
    await h.init('install')
    assert.equal(JSON.stringify(h.state.stored), JSON.stringify(credentials))
    await h.reactive()
    assert.equal(h.state.mints, 1)
  })
}

test('rejects malformed results without an immediate mint retry', async () => {
  for (const bad of [
    null,
    { version: '1', result: { type: 'group', value: [] } },
    {
      version: '1',
      result: { type: 'group', value: [{ type: 'group', value: [] }] },
    },
  ]) {
    const h = harness()
    h.state.result = bad
    await h.init('install')
    assert.equal(h.state.stored, undefined)
    assert.equal(h.state.mints, 1)
  }
})

test('registers a later ntfy installation before provisioning', async () => {
  const h = harness()
  h.state.installed = false
  await h.init('install')
  assert.equal(h.state.mints, 0)
  h.state.installed = true
  await h.reactive()
  assert.equal(h.state.mints, 1)
  assert.equal(h.state.dependencies.ntfy.kind, 'exists')
  assert.equal(h.state.dependencies.ntfy.versionRange, '>=2.26.3:0')
  assert.equal(h.state.dependencies.ntfy.healthChecks, undefined)
})

test('restore replaces old credentials once, despite retained restore kind', async () => {
  const h = harness()
  h.state.stored = { ...credentials, token: 'dead-token' }
  await h.init('restore')
  assert.equal(h.state.stored.token, credentials.token)
  await h.reactive('restore')
  assert.equal(h.state.mints, 1)
})

test('restore with stopped ntfy clears cache and waits for start', async () => {
  const h = harness()
  h.state.stored = credentials
  h.state.started = false
  await h.init('restore')
  assert.equal(h.state.stored, undefined)
  assert.equal(h.state.mints, 0)
  h.state.started = true
  await h.reactive('restore')
  assert.equal(h.state.mints, 1)
})

test('regular startup retains credentials; removal clears them', async () => {
  const h = harness()
  h.state.stored = credentials
  await h.init(null)
  assert.equal(h.state.mints, 0)
  h.state.installed = false
  await h.reactive()
  assert.equal(h.state.stored, undefined)
})
