/**
 * Locales for the want-a-init settings card.
 *
 * One namespace (`want-a-init`) covering the card chrome (title,
 * description), the field label and hint, the dropdown options, and
 * the save/discard buttons. zh + en shipped; extend by adding the
 * same key to both `en` and `zh`.
 *
 * Note: no `unsaved` key — the card no longer carries a header badge
 * for staged edits; the Save / Discard buttons' disabled state is the
 * only dirty indicator.
 */

export type WantAInitKey = keyof typeof en

export const en = {
  'title': 'want-a-init',
  'description': 'Controls the persistent AGENTS.md maintenance nudge that ships with every agent.',
  'expand': 'Expand',
  'collapse': 'Collapse',
  'readOnly': 'The settings document is read-only in this deployment; changes here would have no effect.',
  'field.maintenance': 'Maintenance nudge',
  'field.maintenance.hint': 'Adds a short paragraph to every agent\'s system prompt that reminds the model to update AGENTS.md whenever it discovers verified commands, architecture facts, conventions, or pitfalls. The /init command still works regardless of this setting.',
  'option.on': 'On',
  'option.off': 'Off',
  'discard': 'Discard',
  'save': 'Save',
  'saving': 'Saving',
  'saveFailed': 'Save did not land; your changes are still staged.',
} as const

export const zh = {
  'title': 'want-a-init',
  'description': '控制每个 agent 都带上的 AGENTS.md 维护提醒段落。',
  'expand': '展开',
  'collapse': '折叠',
  'readOnly': '当前部署的 settings 文档为只读；此处修改不会生效。',
  'field.maintenance': '维护提醒',
  'field.maintenance.hint': '向每个 agent 的 system prompt 追加一段简短的提醒，让模型在发现经核实的命令、架构事实、约定或陷阱时主动更新 AGENTS.md。/init 命令不受此开关影响。',
  'option.on': '开启',
  'option.off': '关闭',
  'discard': '放弃',
  'save': '保存',
  'saving': '保存中',
  'saveFailed': '保存未生效；改动暂存中。',
} as const