# want-a-init

DSH plugin that provides a model-driven `/init` command: it analyzes the current project and generates/updates a high-signal `AGENTS.md`, and exposes a WebUI toggle for the persistent maintenance system-prompt section.

## Project

- Type: DeepSeek Harness host plugin with a paired client half — `/init` slash command, persistent system-prompt section, and a Plugins-section settings card.
- Host language: plain ESM JavaScript; `lib/index.js` is committed directly (no compile step on the host).
- Client language: TypeScript + TSX; `src/client/` is bundled to `lib/client.js` by `tsdown` (lazy-CJS factory wrapping `window.__ModuleLoader__.load({id, factory})`).
- Entry: host exports `name`, `inject`, `Config`, `WANT_A_INIT_SETTINGS_NAMESPACE`, `apply` from `lib/index.js`; client exports `inject`, `apply` from `lib/client.js`.
- Plugin identity: command registered as `init`; patch/loader id is `init-command` (bundle name `want-a-init`); settings namespace is `want-a-init`; client slot key is `want-a-init` (matches namespace for auto-pairing).
- Distribution: GitHub `mexiaosqwq/want-a-init`; also installable from a local path.

## Commands

- Local dependency setup: `pnpm install` in the repo. Peer deps (`@deepseek-ai/cordis`, `@deepseek-ai/dsh-commands`, `@deepseek-ai/dsh-llm`, `@deepseek-ai/dsh-settings`, `@deepseek-ai/dsh-client-locale`, `@deepseek-ai/dsh-client-ui-settings`, `@deepseek-ai/dsh-client-ui-renderer`, `@deepseek-ai/dsh-client-ui-settings-plugins`, `@deepseek-ai/dsh-client-ui-primitives`, `@deepseek-ai/dsh-client-ui-slots`, `react`) and the runtime dep `@deepseek-ai/schemastery` must all be resolvable from the linked source; without this, `/init` will not appear and hot-install fails with `Cannot find package '@deepseek-ai/dsh-llm'`. The `prepare` script runs `tsdown` so `lib/client.js` is rebuilt on `pnpm install`.
- Build (client): `pnpm build` → `tsdown` → `lib/client.js` + source map.
- Syntax check: `node --check lib/index.js`.
- Install from GitHub: `dsh plugin --profile web add github:mexiaosqwq/want-a-init`.
- Install locally: `dsh plugin --profile web add <path-to-repo>`.
- Restart after install: `dsh web`.
- Before installing the bundle, remove any manually added `init-command` row in `profiles/web/cordis.patch.yml` — it would override the distributed plugin.

## Architecture

- Host (`lib/index.js`, plain ESM JS):
  - `buildPrompt(cwd, rawInput)` builds the `/init` prompt; `force` → overwrite, otherwise merge-or-create; `minimal`/`detailed` adjust length goal; includes a fill-in skeleton (`Project`, `Commands`, `Architecture`, `Conventions`, `Pitfalls`, `Maintenance`).
  - `MAINTENANCE_TEXT` is the persistent section's body, lifted to a top-level constant so it is reusable and testable.
  - `Config` is the schemastery schema for the plugin config (`{ maintenance: boolean }`, default `true`).
  - `WANT_A_INIT_SETTINGS_NAMESPACE` (`'want-a-init'`, validated by the `SettingsNamespaceInput<>` brand at the `installSection` call site) is the DSH settings namespace; layered resolution: `cordis.patch.yml` `config.maintenance` → user-settings layer (`want-a-init.maintenance`) → schema default `true`.
  - `apply(ctx, config)` registers the `/init` command via `ctx.commands.register`, then `ctx.inject(['settings'], sctx => sctx.settings.installSection(...))` wires the same boolean into the user-settings layer (DSH 0.1.2-rc.1: the old top-level `installSettingsSection()` helper was moved onto `ctx.settings.installSection()`), then `ctx.inject(['systemPrompt'])` adds the persistent `agents-md-maintenance` section. The section's `text:` is a closure over `maintenance`, so toggling is hot-reloaded on the very next LLM call without re-registering.
- Client (`src/client/`, TSX):
  - `WantAInitCard.tsx` mirrors `ui-settings-plugins/PluginCard`'s disclosure chrome (collapsed by default, click-to-expand, save/discard footer). Inside the body: one `Menu` dropdown (On / Off, from `dsh-client-ui-primitives`) bound to the namespace via `ctx.settingsScope.bind({namespace:'want-a-init'})`. The dropdown pick stages the new value in local state; Save calls `scope.set('maintenance', value)` or `scope.unset('maintenance')` (when staged matches the cordis `base`, the redundant user entry is cleared instead). Discard drops the staged edit without writing. Reads via `useSyncExternalStore(scope.subscribe, scope.getSnapshot)`; the scope's `value` resolves through `user → base → schema default`.
  - **No header badge for staged edits.** The Save / Discard buttons' disabled state is the only dirty indicator — earlier the card carried a `未保存` / `Unsaved` pill in the header, but it was removed after a local DSH build's decoration rendered it as a chase-spinner (see Pitfalls).
  - `WantAInitCard.module.css` uses `--dsw-alias-*` tokens matching `PluginCard.module.css` exactly (own chrome; bundle purity gate forbids value-importing `ui-settings-plugins`' `PluginCard` / `CardForm`).
  - `locales.ts` ships zh + en for the card copy, dropdown options, and save/discard buttons.
  - `index.ts` registers the card into `settings.plugin.item` with `key: 'want-a-init'`. Loader pairs the key against the namespace the host serves — no registry glue.
- Bundle (`tsdown.config.ts`):
  - Banner/footer wrap output as `window.__ModuleLoader__.load({ id: 'want-a-init', factory: (require) => {...} })`.
  - `neverBundle`: `@deepseek-ai/dsh-client-locale`, `@deepseek-ai/dsh-client-ui-settings`, `@deepseek-ai/dsh-client-ui-renderer`, `@deepseek-ai/dsh-client-ui-primitives`, `react` (loader module table answers these; everything else inlines). DSH 0.1.2-rc.1: the legacy `@deepseek-ai/dsh-client-runtime` was split — `settingsScope` lives on `dsh-client-ui-settings`, the slot-registry merge on `dsh-client-ui-renderer`. `@deepseek-ai/dsh-client-ui-settings-plugins` is now consumed type-only (for the `settings.plugin.item` slot declaration) and does not need a runtime loader injection.
  - Inline CSS Modules via lightningcss: hashed class map + auto-injected `<style>` tag.
- Three-layer resolution for `maintenance`: `cordis.patch.yml` `config.maintenance` → user-settings layer (`want-a-init.maintenance`, written by the WebUI) → schema default `true`. Toggle writes only the user layer.
- The command does NOT write `AGENTS.md` itself: it calls `invocation.agent.followup(createUserMessage(...))` so the model performs the analysis in the next turn, then returns an immediate success message.
- `lib/index.d.ts` mirrors the host exports; `cordis.patch.yml` inserts the loader row.
- No CI configuration.

## Conventions

- Only `AGENTS.md` is generated/updated by `/init`; never create `CLAUDE.md` or any other file.
- Keep the injected prompt high-signal: exact commands, real architecture, repo-specific pitfalls; no generic advice.
- Support `force`, `minimal`, and `detailed` modes.
- The host `systemPrompt` section's `text:` MUST stay a function (`() => maintenance ? MAINTENANCE_TEXT : ''`), not a static string — a literal would be captured once and the WebUI toggle would silently stop working.
- The client card uses the staged form pattern: dropdown pick writes local state, only Save calls `scope.set` / `scope.unset`. A direct write on every pick would lose the user's ability to preview / discard edits and would round-trip on every dropdown open.
- On Save, prefer `scope.set('maintenance', value)` over `scope.unset('maintenance')` when the staged value DIFFERS from the cordis `base` — `unset` clears the user override, leaving the user with the deployer default they explicitly rejected. Only `unset` when the staged value matches the `base` (redundant entry otherwise).
- **Do not reintroduce a header badge for staged edits.** The Save / Discard buttons' disabled state is sufficient and survives local-build decoration churn.
- Bundle patch lives in `cordis.patch.yml`; keep its `id: init-command` unique to avoid duplicate loader entries.
- Keep `lib/index.d.ts` in sync with `lib/index.js`.
- Peer dependencies use range declarations (`@deepseek-ai/cordis`, `@deepseek-ai/dsh-commands`, `@deepseek-ai/dsh-llm`, `@deepseek-ai/dsh-settings`, `@deepseek-ai/dsh-client-locale`, `@deepseek-ai/dsh-client-ui-settings`, `@deepseek-ai/dsh-client-ui-renderer`, `@deepseek-ai/dsh-client-ui-settings-plugins`, `@deepseek-ai/dsh-client-ui-primitives`, `@deepseek-ai/dsh-client-ui-slots`, `react`); `@deepseek-ai/schemastery` is a runtime `dependency`. Do not hardcode patch versions.

## Pitfalls

- Local `link:` installs fail without `pnpm install` in the repo: the plugin cannot resolve `@deepseek-ai/dsh-llm`, so `/init` never appears in the client. The same applies to `@deepseek-ai/dsh-client-locale` / `-ui-settings` / `-ui-renderer` / `-ui-settings-plugins` / `-ui-primitives` / `-ui-slots`: if any one is unresolvable, the card never renders (but the host half still works).
- When no settings provider is mounted (headless profile), the `ctx.inject(['settings'], ...)` block silently no-ops; the section still ships with the cordis default. This is intentional, not a regression.
- `lib/client.js` is committed; if you change anything under `src/client/`, run `pnpm build` (or rely on the `prepare` script on next install) so the bundle stays in sync. The committed bundle is what the loader serves.
- The card registers into `settings.plugin.item` keyed by the namespace — a server entry without `dsh.client` declaration in `package.json` makes the client half invisible to the loader, even if `lib/client.js` is present on disk.
- A manually added `init-command` row in `profiles/web/cordis.patch.yml` can shadow or override this bundle; remove it before installing.
- **Local DSH builds may inject ad-hoc decorations on common class names.** One such build wires `.pending`-shaped elements to a chase-spinner (`cpSpin` keyframe + `::before` / `::after` shapes); any "Pending" or "Unsaved" pill added to this card would visibly rotate and overlap the text. The card avoids this by omitting the header badge entirely; if you ever reintroduce one, audit the local build's CSS first (`document.querySelectorAll('*').filter(el => getComputedStyle(el).animationName !== 'none')` shows every animated element).
- `buildPrompt` currently has no covering tests (CodeGraph flags no tests); be careful when changing prompt logic.
- `.codegraph/` is generated locally by CodeGraph and must stay gitignored; `pnpm-lock.yaml` is committed for reproducible local installs.

## Maintenance

- This file is a living form: whenever you discover a new repo-specific command, convention, architecture fact, or pitfall, update the matching section here in place.
- Keep it accurate and concise; remove stale or generic entries as the repository evolves.
- Never create `CLAUDE.md` as a substitute.
- When adding new WebUI toggles, extend the `want-a-init` schema (not a new namespace) so users see one card in the Plugins section, not a clutter of single-key cards.