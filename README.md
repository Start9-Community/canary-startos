<p align="center">
  <img src="icon.svg" alt="Canary Logo" width="21%">
</p>

# Canary on StartOS

> **Upstream docs:** <https://github.com/schjonhaug/canary/>
>
> Everything not listed in this document should behave the same as upstream
> Canary. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable.

[Canary](https://github.com/schjonhaug/canary/) is a self-hosted Bitcoin wallet monitoring service that provides watch-only wallet management, real-time transaction notifications via ntfy.sh, and balance alerts with configurable thresholds.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Dependencies](#dependencies)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property | Value |
|----------|-------|
| Image (backend) | `schjonhaug/canary-backend` (upstream unmodified) |
| Image (frontend) | `schjonhaug/canary-frontend` (upstream unmodified) |
| Architectures | x86_64, aarch64 (as provided by upstream images) |
| Entrypoint | Default upstream entrypoints |

Canary runs as two separate containers: a backend API server and a frontend web UI.

---

## Volume and Data Layout

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `main` | `/app/data` (backend) | All Canary data |

**Key paths on the `main` volume:**

- `store.json` — StartOS persistent settings (selected Electrum server, auto-generated admin password, auto-generated JWT secret)

---

## Installation and First-Run Flow

| Step | Upstream | StartOS |
|------|----------|---------|
| Installation | Docker Compose | Install from marketplace |
| Electrum server | Manual configuration | Select via action (Fulcrum or Electrs) |
| Login | Set via environment | Auto-generated; set/reset via the Set Admin Password action |

**First-run steps:**

1. Install either Fulcrum or Electrs (required for blockchain lookups)
2. Install Canary from the StartOS marketplace
3. A **critical task** will prompt you to select your Electrum server (Fulcrum or Electrs) — the service will not start until this is resolved
4. A **critical task** will prompt you to run **Set Admin Password** — the service will not start until you do; copy the generated password and sign in to the web UI
5. Add wallets and configure notifications in the web UI

---

## Configuration Management

| StartOS-Managed | Upstream-Managed |
|-----------------|------------------|
| Electrum server selection (Fulcrum/Electrs) | Wallet management |
| Network configuration (mainnet) | Notification settings (ntfy.sh) |
| Sync interval (60 seconds) | Language preferences |
| Admin password (auto-generated) | All other settings via web UI |
| Data directory | |

**Environment variables set by StartOS:**

| Variable | Value | Purpose |
|----------|-------|---------|
| `CANARY_NETWORK` | `mainnet` | Bitcoin network |
| `CANARY_ELECTRUM_URL` | `tcp://<electrum>.startos:50001` | Electrum server address |
| `CANARY_BIND_ADDRESS` | `0.0.0.0:3001` | Backend bind address |
| `CANARY_DATA_DIR` | `/app/data` | Data directory |
| `CANARY_MODE` | `self-hosted` | Running mode |
| `CANARY_SELF_HOSTED_ADMIN_PASSWORD` | (auto-generated) | Admin account password |
| `CANARY_SYNC_INTERVAL` | `60` | Sync interval in seconds |
| `CANARY_MEMPOOL_URLS` | (auto-detected, optional) | Local Mempool explorer URLs |
| `CANARY_BTC_RPC_EXPLORER_URLS` | (auto-detected, optional) | Local Bitcoin Explorer URLs |
| `CANARY_TX_EXPLORER_PLATFORM` | `startos` when local explorers are available | Local explorer platform label |
| `JWT_SECRET` | (auto-generated) | Session-token signing secret |

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose |
|-----------|------|----------|---------|
| Web UI | 3000 | HTTP | Canary dashboard |

The backend API runs on port 3001 internally and is accessed by the frontend container. Only the frontend (port 3000) is exposed to the user.

**Access methods (StartOS 0.4.0):**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

---

## Actions (StartOS UI)

### Select Electrum Server

Choose which Electrum server to use for address lookups.

| Property | Value |
|----------|-------|
| Availability | Any status |
| Visibility | Always visible |
| Inputs | Select: Fulcrum or Electrs |

### Set Admin Password

Generate a new random password for the Canary admin account. On install a critical task prompts you to run this before the service starts; to reset a lost or compromised password later, stop Canary, run this action, then start Canary again. Canary uses the fixed self-hosted username internally, so users only need the generated password.

| Property | Value |
|----------|-------|
| Availability | Stopped only |
| Visibility | Always visible (also surfaced as a critical task on install) |
| Inputs | None |

---

## Dependencies

| Dependency | Required | Purpose |
|------------|----------|---------|
| Fulcrum | One of Fulcrum or Electrs required | Electrum server for blockchain lookups |
| Electrs | One of Fulcrum or Electrs required | Electrum server for blockchain lookups |
| Mempool | Optional | Local transaction explorer links |
| Bitcoin Explorer | Optional | Local transaction explorer links |

One of Fulcrum or Electrs must be installed and running. If no Electrum server is selected, a critical task is created at startup blocking the service until resolved.

---

## Backups and Restore

**Included in backup:**

- `main` volume — all Canary data, wallets, and settings

**Restore behavior:**

- All wallets, notification settings, and configuration restored
- No reconfiguration needed

---

## Health Checks

| Check | Display Name | Method | Grace Period | Messages |
|-------|--------------|--------|--------------|----------|
| Backend | Server | HTTP check on `/api/block-headers/current` (port 3001) | 60s | Ready / Not ready |
| Frontend | Web interface | Port listening check (port 3000) | Default | Ready / Not ready |

---

## Limitations and Differences

1. **Fixed Electrum server** — Canary connects to a local Fulcrum or Electrs instance on StartOS; external Electrum servers cannot be configured
2. **Fixed sync interval** — the sync interval is set to 60 seconds and cannot be changed via the StartOS UI
3. **Mainnet only** — the network is hardcoded to mainnet

---

## What Is Unchanged from Upstream

- Watch-only wallet management (BDK)
- Multipath descriptor support (P2WPKH, P2SH, P2TR, P2PKH)
- Real-time transaction notifications via ntfy.sh
- Deep scanning for high address indexes
- Transaction analysis (RBF/CPFP detection)
- Multi-language support (English and Norwegian)
- Balance alerts with configurable thresholds
- All web UI features

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: canary
architectures: [x86_64, aarch64]
images:
  backend: schjonhaug/canary-backend
  frontend: schjonhaug/canary-frontend
volumes:
  main: /app/data
ports:
  ui: 3000
  server: 3001 (internal)
dependencies:
  - fulcrum (one of fulcrum/electrs required)
  - electrs (one of fulcrum/electrs required)
  - mempool (optional, local transaction explorer links)
  - bitcoin-explorer (optional, local transaction explorer links)
actions:
  - select-electrum
  - set-admin-password
health_checks:
  - server: http_check 3001/api/block-headers/current
  - web: port_check 3000
backup_volumes:
  - main
startos_managed_env_vars:
  - CANARY_NETWORK
  - CANARY_ELECTRUM_URL
  - CANARY_BIND_ADDRESS
  - CANARY_DATA_DIR
  - CANARY_MODE
  - CANARY_SELF_HOSTED_ADMIN_PASSWORD
  - CANARY_SYNC_INTERVAL
  - CANARY_MEMPOOL_URLS
  - CANARY_BTC_RPC_EXPLORER_URLS
  - CANARY_TX_EXPLORER_PLATFORM
  - JWT_SECRET
```
