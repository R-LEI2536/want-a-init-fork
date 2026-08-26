/**
 * Client half: register one card into the existing Plugins section under
 * the `want-a-init` key. The Plugins section's keyed dispatch pairs the
 * key against the namespaces the Host serves; both halves of this plugin
 * (host `installSettingsSection` + client card) keyed `want-a-init`
 * join automatically without any registry glue.
 *
 * The card binds `ctx.settingsScope` to the same namespace the host
 * registered, so user writes flow through `scope.set` / `scope.unset`
 * and land in the host's `cfgThunk` on the next read.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
// Type-only: pulls the settings.section + settings.plugin.item slot
// declarations into this file's compile-time view. Cross-plugin
// collaboration goes through cordis services; a value import would
// fail the client bundle purity gate.
import type {} from '@deepseek-ai/dsh-client-ui-settings-plugins/client'
import { WantAInitCard, type WantAInitCardInjected } from './WantAInitCard'
import { en, zh, type WantAInitKey } from './locales'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The want-a-init card copy. */
    'want-a-init': WantAInitKey
  }
}

/** Dictionary namespace owned by this card. */
const NS = 'want-a-init'

/** Keyed slot entry — must match the host's settingsNamespace('want-a-init'). */
const KEY = 'want-a-init'

/** Required services: slot registry, locale registry, settings scope. */
export const inject = ['slots', 'locale', 'settingsScope']

/**
 * Client plugin body: register the card.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(
    () => { ctx.locale.register(NS, { zh, en }) },
    'want-a-init: card dictionary',
  )

  ctx.slots.inject('settings.plugin.item', () => ctx.slots.register({
    name: 'settings.plugin.item',
    key: KEY,
    locale: NS,
    inject: (): WantAInitCardInjected => ({
      // Bind the scope on the caller's plugin lifecycle — the scope's
      // disposer is owned by this plugin's fiber. Binding adds no wire
      // read of its own because settings reads ride the shared describe
      // mirror.
      scope: ctx.settingsScope.bind<{ maintenance?: boolean }>({ namespace: KEY }),
    }),
  }, WantAInitCard))
}