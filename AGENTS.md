# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

**Bugs and feature requests are GitHub issues on this repo** — file them as you find them.
Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **Import each Electrum server's host id and port from its own package** (`electrs-startos/startos/utils`, `fulcrum-startos/startos/utils`) rather than hardcoding — a change on their side then breaks the build here instead of silently misconnecting.
- **`electrs`'s version floor is load-bearing, not hygiene.** Earlier revisions fetch blocks on bitcoind's unprivileged p2p listener, where Canary's address-history queries get the connection dropped — and electrs exits rather than reconnecting, landing in a restart loop under exactly this workload. Don't lower it.
- **The Electrum dependency is declared from the store, so the "no selection" branch must keep raising its task.** With nothing selected the package declares no dependency at all and `main` throws; the task is what gets the user out of that state.
- **Explorer lookups are `.catch(() => [])` on purpose.** These are not dependencies; an uninstalled explorer must degrade to "no links", never to a failed start.
