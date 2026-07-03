# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `canary`.** Runs as two subcontainers: a backend API server (`backend-sub`, image `backend`) and a frontend web UI (`web-sub`, image `frontend`, the exported `ui` interface).
- **Depends on a local Electrum server — Fulcrum or Electrs — chosen via the `select-electrum` action.** The backend reaches the selected server's electrum interface (interface id `main`; host id `main` on Fulcrum, `electrum` on Electrs) over the internal LXC bridge; `main.ts` throws until it is reachable. Optional Mempool (host `main`/interface `webui`) and Bitcoin Explorer (host `ui-multi`/interface `ui`) URLs are read over the bridge and passed to the frontend for transaction links (`startos/localExplorers.ts`). None of these are `package.json` dependencies, so their host/interface ids are string literals, not imports.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach canary -n <name> -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `backend-sub` or `web-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
