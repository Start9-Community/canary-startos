# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `canary`.** Runs as two subcontainers: a backend API server (`backend-sub`, image `backend`) and a frontend web UI (`web-sub`, image `frontend`, the exported `ui` interface).
- **Depends on a local Electrum server — Fulcrum or Electrs — chosen via the `select-electrum` action.** The backend dials the selected server's electrum interface over the internal LXC bridge via the `bridgeAddress` helper in `startos/utils.ts` (`sdk.getOsIp` + the assigned external port of the server's `bindings[<internal port>]`), resolved reactively with `.const()` (doctrine v3): a server update is 0 restarts, install/uninstall/port-change is one healing restart. While the server is absent the helper resolves null and `main.ts` throws until it is reachable; the `.const()` heals when it appears. The server host ids and internal ports are imported from each server package (`mainHostId`/`electrumPort` from `fulcrum-startos/startos/utils`, `electrumHostId`/`port` from `electrs-startos/startos/utils`), never hardcoded.
- **Optional local block explorers give the frontend transaction *links*, not dials.** Mempool (host `main`/interface `webui`) and Bitcoin Explorer (host `ui-multi`/interface `ui`) contribute their `nonLocal` browser-navigable URLs (LAN/Tor/clearnet) as `CANARY_MEMPOOL_URLS`/`CANARY_BTC_RPC_EXPLORER_URLS` (`startos/localExplorers.ts`). These are addresses the user's browser opens, so they must come from `addressInfo.nonLocal` — **not** the `bridgeAddress` helper, whose `10.x` bridge address is unreachable from a browser. They stay a reactive `.const()` read (auto-healing, `.once()` is forbidden), so an explorer update is 0 restarts and install/uninstall/new-onion is one. Host ids are imported (`mainHostId` from `mempool-startos/startos/utils`, `uiHostId` from `bitcoin-explorer-startos/startos/interfaces`); the interface ids (`webui`, `ui`) remain string literals as the deps don't export them.
- **These four servers are `package.json` dependencies** pinned at `#next` (`fulcrum-startos`, `mempool-startos` on `Start9Labs`; `electrs-startos`, `bitcoin-explorer-startos` on `Start9-Community`) purely to import the host-id/port consts above; they are not runtime code deps.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach canary -n <name> -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `backend-sub` or `web-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
