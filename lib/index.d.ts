import type { Context } from '@deepseek-ai/cordis'
import type { z } from '@deepseek-ai/schemastery'

export declare const name = 'init-command'
export declare const inject: string[]

/** Settings namespace exposing this plugin's toggles in the DSH Web UI. */
export declare const WANT_A_INIT_SETTINGS_NAMESPACE: string

/** Plugin config — single master switch for the maintenance section. */
export declare const Config: z<{ maintenance: boolean }>

export declare function apply(ctx: Context, config: { maintenance: boolean }): void