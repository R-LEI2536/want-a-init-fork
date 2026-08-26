/**
 * WantAInitCard — the Plugins-section card for want-a-init.
 *
 * Mirrors the disclosure chrome of `ui-settings-plugins/PluginCard`:
 *   - closed by default; the header button expands/collapses the body
 *   - one dropdown (On / Off) inside, staged locally, written on Save
 *   - pending badge on the header when the staged value differs from saved
 *   - Discard drops the staged edit; Save writes via the settings scope
 *
 * The card reuses its own CSS rather than importing `PluginCard` /
 * `CardForm` from `ui-settings-plugins` — the bundle purity gate
 * forbids value imports across plugins, so the chrome lives next to
 * the card.
 */
import { useRef, useState, useSyncExternalStore, type ReactElement } from 'react'
import type { InjectFace, PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import { IconChevronDownOutline14, Menu } from '@deepseek-ai/dsh-client-ui-primitives'
import type { SettingsScope } from '@deepseek-ai/dsh-client-runtime/client'
import type { WantAInitKey } from './locales'
import css from './WantAInitCard.module.css'

/** Section field this card edits. */
export interface WantAInitSettings {
  /** Whether the agents-md-maintenance system-prompt section is on. */
  maintenance?: boolean
}

/** Injected business face from the client plugin. */
export interface WantAInitCardInjected {
  /** Live settings scope for the `want-a-init` namespace. */
  scope: SettingsScope<WantAInitSettings>
}

/** Full component props: locale seat + injected scope. */
export type WantAInitCardProps =
  & PropsLocale<'want-a-init'>
  & InjectFace<WantAInitCardInjected>

/**
 * Render the want-a-init card.
 * @param props - locale copy and the bound settings scope.
 * @returns the card, or nothing while the namespace is not served.
 */
export function WantAInitCard(props: WantAInitCardProps): ReactElement | null {
  const { t } = props
  const scope = props.scope
  const snapshot = useSyncExternalStore(
    (cb) => { scope.subscribe(cb) },
    () => scope.getSnapshot(),
  )
  const available = snapshot.status === 'ready'
  if (!available) return null

  // Layered resolution: user overrides base; absent user keys fall back to
  // base; absent base falls back to the schema default (`true`).
  const baseValue = (snapshot.base?.maintenance) ?? true
  const savedValue = (snapshot.value?.maintenance) ?? baseValue

  const [open, setOpen] = useState(false)
  // Staged draft: undefined means "no edit pending". A boolean means the
  // user picked On / Off and the change is waiting on Save.
  const [staged, setStaged] = useState<boolean | undefined>(undefined)
  const [menuOpen, setMenuOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [failed, setFailed] = useState(false)
  const anchorRef = useRef<HTMLButtonElement | null>(null)

  const draftValue = staged ?? savedValue
  const dirty = staged !== undefined && staged !== savedValue
  const writable = snapshot.writable

  const onPick = (id: string): void => {
    setMenuOpen(false)
    if (id === 'on') setStaged(true)
    else if (id === 'off') setStaged(false)
  }

  const onSave = async (): Promise<void> => {
    if (!dirty || !writable || staged === undefined) return
    setSaving(true)
    setFailed(false)
    let landed = true
    try {
      if (staged === baseValue) {
        // The staged edit matches the cordis `base`: clear the user
        // override instead of writing a redundant value.
        await scope.unset('maintenance')
      } else {
        await scope.set('maintenance', staged)
      }
    } catch (_writeFailure) {
      landed = false
    }
    // The scope snapshot updates synchronously after set/unset on the
    // shared describe mirror; trust the new read-back rather than guess.
    const fresh = scope.getSnapshot()
    landed = landed && fresh.value?.maintenance === staged
    setSaving(false)
    setFailed(!landed)
    if (landed) setStaged(undefined)
  }

  const onDiscard = (): void => {
    if (!dirty) return
    setStaged(undefined)
    setFailed(false)
  }

  const labelFor = (value: boolean): string => t(value ? 'option.on' : 'option.off')

  return (
    <li className={`${css.card} ${open ? css.cardOpen : ''}`}>
      <button
        type="button"
        className={css.header}
        aria-expanded={open}
        aria-label={`${t(open ? 'collapse' : 'expand')}: ${t('title')}`}
        onClick={() => { setOpen(!open) }}
      >
        <span className={css.headText}>
          <span className={css.name}>{t('title')}</span>
          <span className={css.description}>{t('description')}</span>
        </span>
        {dirty ? <span className={css.pending}>{t('unsaved')}</span> : null}
        <IconChevronDownOutline14
          size={14}
          className={`${css.chevron} ${open ? css.chevronOpen : ''}`}
        />
      </button>
      {open ? (
        <div className={css.body}>
          {!writable ? (
            <p className={css.readOnly} role="status">{t('readOnly')}</p>
          ) : null}
          <div className={css.field}>
            <div className={css.fieldHead}>
              <span className={css.label}>{t('field.maintenance')}</span>
              <Menu
                open={menuOpen}
                anchor={(
                  <button
                    ref={anchorRef}
                    type="button"
                    className={`${css.dropdownTrigger} ${menuOpen ? css.dropdownOpen : ''}`}
                    onClick={() => { setMenuOpen(!menuOpen) }}
                    disabled={!writable}
                  >
                    <span>{labelFor(draftValue)}</span>
                    <IconChevronDownOutline14
                      size={14}
                      className={css.dropdownChevron}
                    />
                  </button>
                )}
                items={[
                  { id: 'on', label: t('option.on') },
                  { id: 'off', label: t('option.off') },
                ]}
                selectedId={draftValue ? 'on' : 'off'}
                onSelect={onPick}
                onClose={() => { setMenuOpen(false) }}
                side="bottom"
                align="start"
              />
            </div>
            <p className={css.hint}>{t('field.maintenance.hint')}</p>
          </div>
          <div className={css.footer}>
            {failed ? <p className={css.readOnly} role="status">{t('saveFailed')}</p> : null}
            <button
              type="button"
              className={css.discard}
              disabled={!dirty || saving}
              onClick={onDiscard}
            >
              {t('discard')}
            </button>
            <button
              type="button"
              className={css.save}
              disabled={!dirty || !writable || saving}
              onClick={() => { void onSave() }}
            >
              {t(saving ? 'saving' : 'save')}
            </button>
          </div>
        </div>
      ) : null}
    </li>
  )
}