# Canary

## Documentation

- [Canary upstream README](https://github.com/schjonhaug/canary#readme) — features, supported wallet types, and notification options.
- [Canary issue tracker](https://github.com/schjonhaug/canary/issues) — bugs and feature requests.

## What you get on StartOS

- A **Web UI** for Canary on the bundled `ui` interface.
- A watch-only monitor that looks up your wallets through your own local Electrum server — **Fulcrum** or **Electrs**. Addresses never leave your StartOS.
- A built-in admin account whose password is generated and rotated by a StartOS action.

## Getting set up

1. Install **Fulcrum** or **Electrs** on StartOS and let it fully sync. Canary will not start until one is selected and running.
2. On first install, StartOS posts a critical **Set Admin Password** task. Run it and copy the generated password to a password manager — you'll need it to sign in.
3. Run the **Select Electrum Server** action and pick which dependency Canary should talk to (defaults to Fulcrum).
4. Open the **Web UI** and sign in with the password from step 2.

## Using Canary

### Adding a wallet

1. In the Web UI, click **Add Wallet**.
2. Give it a name (e.g. "Cold Storage", "Hardware Wallet").
3. Paste your **extended public key** (xpub / ypub / zpub) or **output descriptor**.
4. Click **Create**. The wallet begins syncing — initial scans for wallets with deep address indexes can take a few minutes; Canary detects high indexes automatically.

Canary is watch-only — it only consumes public keys, never holds them, and cannot spend.

### Push notifications

Canary can push transaction events to your phone via [ntfy.sh](https://ntfy.sh):

1. Install the ntfy app ([Android](https://play.google.com/store/apps/details?id=io.heckel.ntfy) / [iOS](https://apps.apple.com/app/ntfy/id1625396347)) and subscribe to a topic of your choice.
2. In Canary, add a contact and paste the same ntfy topic.
3. Incoming and outgoing transactions, confirmations, RBF and CPFP detection, and balance-alert crossings all land as push notifications.

#### Using the StartOS ntfy service (optional)

If you'd rather keep notifications fully self-hosted, install Start9's **ntfy** package and wire Canary to it manually:

1. On ntfy, run the **Provision Publisher** action with a publisher ID of `canary` and the topic you want Canary to use. ntfy returns a token — copy it.
2. In Canary's settings, set the **ntfy server URL** to `http://ntfy.startos` (the in-cluster address — *not* your LAN or Tor URL; Canary publishes server-side, similar to the upstream Umbrel guidance) and add the publisher token as the authorization credential. Paste the same topic from step 1.
3. On your phone, point the ntfy app at your StartOS ntfy package's **public** address (LAN or Tor, the same one you'd open in a browser) and subscribe to the topic.

### Balance alerts

Set per-wallet thresholds in the Web UI to fire when a balance goes **above**, **below**, or **equals** a target amount. Alerts use the same push channel as transaction notifications.

### Actions

- **Select Electrum Server** — pick **Fulcrum** or **Electrs** as Canary's address-lookup backend. Re-run any time to switch.
- **Set Admin Password** — generate a new random password for the built-in admin account. Stop Canary before running it to rotate or recover access.
