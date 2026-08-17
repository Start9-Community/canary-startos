# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Import each Electrum server's host id and port from its own package** (`electrs-startos/startos/utils`, `fulcrum-startos/startos/utils`) rather than hardcoding — a change on their side then breaks the build here instead of silently misconnecting.
- **`electrs`'s version floor is load-bearing, not hygiene.** Earlier revisions fetch blocks on bitcoind's unprivileged p2p listener, where Canary's address-history queries get the connection dropped — and electrs exits rather than reconnecting, landing in a restart loop under exactly this workload. Don't lower it.
- **The Electrum dependency is declared from the store, so the "no selection" branch must keep raising its task.** With nothing selected the package declares no dependency at all and `main` throws; the task is what gets the user out of that state.
- **Explorer lookups are `.catch(() => [])` on purpose.** These are not dependencies; an uninstalled explorer must degrade to "no links", never to a failed start.
