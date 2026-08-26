window.__ModuleLoader__.load({
	id: "want-a-init",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region \0dsh-css:/home/hive/projects/dsh-plugin_dev/want-a-init-fork/src/client/WantAInitCard.module.css.mjs
		const css = ".PuwOdW_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;list-style:none;transition:border-color .16s,background .16s}.PuwOdW_card:hover{border-color:var(--dsw-alias-label-dimmed)}.PuwOdW_cardOpen{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-label-dimmed)}.PuwOdW_header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.PuwOdW_header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.PuwOdW_headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.PuwOdW_name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.PuwOdW_description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.PuwOdW_chevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s}.PuwOdW_chevronOpen{transform:rotate(180deg)}.PuwOdW_body{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding-bottom:8px}.PuwOdW_readOnly{color:var(--dsw-alias-label-tertiary);margin:12px 0 0;font-size:12px;line-height:1.5}.PuwOdW_pending{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;flex:none;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.PuwOdW_field{border-top:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:6px;padding:12px 0;display:flex}.PuwOdW_body .PuwOdW_field:first-child{border-top:none}.PuwOdW_fieldHead{align-items:center;gap:12px;display:flex}.PuwOdW_label{min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;font-weight:500;line-height:1.5}.PuwOdW_hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}.PuwOdW_dropdownTrigger{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);min-width:120px;max-width:180px;height:32px;color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;text-align:left;border-radius:8px;justify-content:space-between;align-items:center;gap:8px;padding:0 12px;font-size:13px;line-height:1.5;display:inline-flex}.PuwOdW_dropdownTrigger:hover:not(:disabled){border-color:var(--dsw-alias-border-l3)}.PuwOdW_dropdownTrigger:disabled{cursor:default;opacity:.4}.PuwOdW_dropdownChevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .15s}.PuwOdW_dropdownOpen .PuwOdW_dropdownChevron{transform:rotate(180deg)}.PuwOdW_footer{border-top:1px solid var(--dsw-alias-border-l2);justify-content:flex-end;align-items:center;gap:8px;padding:12px 0 4px;display:flex}.PuwOdW_discard,.PuwOdW_save{appearance:none;font:inherit;cursor:pointer;border:1px solid #0000;border-radius:8px;padding:5px 14px;font-size:13px;line-height:1.5}.PuwOdW_discard{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);background:0 0}.PuwOdW_discard:hover:not(:disabled){color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-dimmed)}.PuwOdW_save{background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-layer-3)}.PuwOdW_discard:disabled,.PuwOdW_save:disabled{opacity:.4;cursor:default}.PuwOdW_discard:focus-visible,.PuwOdW_save:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}";
		const tagId = "want-a-init/WantAInitCard.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "want-a-init";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var WantAInitCard_module_css_default = {
			"card": "PuwOdW_card",
			"readOnly": "PuwOdW_readOnly",
			"dropdownChevron": "PuwOdW_dropdownChevron",
			"name": "PuwOdW_name",
			"field": "PuwOdW_field",
			"cardOpen": "PuwOdW_cardOpen",
			"footer": "PuwOdW_footer",
			"header": "PuwOdW_header",
			"fieldHead": "PuwOdW_fieldHead",
			"hint": "PuwOdW_hint",
			"body": "PuwOdW_body",
			"dropdownOpen": "PuwOdW_dropdownOpen",
			"pending": "PuwOdW_pending",
			"dropdownTrigger": "PuwOdW_dropdownTrigger",
			"discard": "PuwOdW_discard",
			"description": "PuwOdW_description",
			"save": "PuwOdW_save",
			"headText": "PuwOdW_headText",
			"chevron": "PuwOdW_chevron",
			"label": "PuwOdW_label",
			"chevronOpen": "PuwOdW_chevronOpen"
		};
		//#endregion
		//#region src/client/WantAInitCard.tsx
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
		/**
		* Render the want-a-init card.
		* @param props - locale copy and the bound settings scope.
		* @returns the card, or nothing while the namespace is not served.
		*/
		function WantAInitCard(props) {
			const { t } = props;
			const scope = props.scope;
			const snapshot = (0, react.useSyncExternalStore)((cb) => {
				scope.subscribe(cb);
			}, () => scope.getSnapshot());
			if (!(snapshot.status === "ready")) return null;
			const baseValue = snapshot.base?.maintenance ?? true;
			const savedValue = snapshot.value?.maintenance ?? baseValue;
			const [open, setOpen] = (0, react.useState)(false);
			const [staged, setStaged] = (0, react.useState)(void 0);
			const [menuOpen, setMenuOpen] = (0, react.useState)(false);
			const [saving, setSaving] = (0, react.useState)(false);
			const [failed, setFailed] = (0, react.useState)(false);
			const anchorRef = (0, react.useRef)(null);
			const draftValue = staged ?? savedValue;
			const dirty = staged !== void 0 && staged !== savedValue;
			const writable = snapshot.writable;
			const onPick = (id) => {
				setMenuOpen(false);
				if (id === "on") setStaged(true);
				else if (id === "off") setStaged(false);
			};
			const onSave = async () => {
				if (!dirty || !writable || staged === void 0) return;
				setSaving(true);
				setFailed(false);
				let landed = true;
				try {
					if (staged === baseValue) await scope.unset("maintenance");
					else await scope.set("maintenance", staged);
				} catch (_writeFailure) {
					landed = false;
				}
				const fresh = scope.getSnapshot();
				landed = landed && fresh.value?.maintenance === staged;
				setSaving(false);
				setFailed(!landed);
				if (landed) setStaged(void 0);
			};
			const onDiscard = () => {
				if (!dirty) return;
				setStaged(void 0);
				setFailed(false);
			};
			const labelFor = (value) => t(value ? "option.on" : "option.off");
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: `${WantAInitCard_module_css_default.card} ${open ? WantAInitCard_module_css_default.cardOpen : ""}`,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: WantAInitCard_module_css_default.header,
					"aria-expanded": open,
					"aria-label": `${t(open ? "collapse" : "expand")}: ${t("title")}`,
					onClick: () => {
						setOpen(!open);
					},
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: WantAInitCard_module_css_default.headText,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: WantAInitCard_module_css_default.name,
								children: t("title")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: WantAInitCard_module_css_default.description,
								children: t("description")
							})]
						}),
						dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: WantAInitCard_module_css_default.pending,
							children: t("unsaved")
						}) : null,
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, {
							size: 14,
							className: `${WantAInitCard_module_css_default.chevron} ${open ? WantAInitCard_module_css_default.chevronOpen : ""}`
						})
					]
				}), open ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: WantAInitCard_module_css_default.body,
					children: [
						!writable ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: WantAInitCard_module_css_default.readOnly,
							role: "status",
							children: t("readOnly")
						}) : null,
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: WantAInitCard_module_css_default.field,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: WantAInitCard_module_css_default.fieldHead,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: WantAInitCard_module_css_default.label,
									children: t("field.maintenance")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
									open: menuOpen,
									anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										ref: anchorRef,
										type: "button",
										className: `${WantAInitCard_module_css_default.dropdownTrigger} ${menuOpen ? WantAInitCard_module_css_default.dropdownOpen : ""}`,
										onClick: () => {
											setMenuOpen(!menuOpen);
										},
										disabled: !writable,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: labelFor(draftValue) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, {
											size: 14,
											className: WantAInitCard_module_css_default.dropdownChevron
										})]
									}),
									items: [{
										id: "on",
										label: t("option.on")
									}, {
										id: "off",
										label: t("option.off")
									}],
									selectedId: draftValue ? "on" : "off",
									onSelect: onPick,
									onClose: () => {
										setMenuOpen(false);
									},
									side: "bottom",
									align: "start"
								})]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: WantAInitCard_module_css_default.hint,
								children: t("field.maintenance.hint")
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: WantAInitCard_module_css_default.footer,
							children: [
								failed ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: WantAInitCard_module_css_default.readOnly,
									role: "status",
									children: t("saveFailed")
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: WantAInitCard_module_css_default.discard,
									disabled: !dirty || saving,
									onClick: onDiscard,
									children: t("discard")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: WantAInitCard_module_css_default.save,
									disabled: !dirty || !writable || saving,
									onClick: () => {
										onSave();
									},
									children: t(saving ? "saving" : "save")
								})
							]
						})
					]
				}) : null]
			});
		}
		//#endregion
		//#region src/client/locales.ts
		const en = {
			"title": "want-a-init",
			"description": "Controls the persistent AGENTS.md maintenance nudge that ships with every agent.",
			"expand": "Expand",
			"collapse": "Collapse",
			"unsaved": "Unsaved",
			"readOnly": "The settings document is read-only in this deployment; changes here would have no effect.",
			"field.maintenance": "Maintenance nudge",
			"field.maintenance.hint": "Adds a short paragraph to every agent's system prompt that reminds the model to update AGENTS.md whenever it discovers verified commands, architecture facts, conventions, or pitfalls. The /init command still works regardless of this setting.",
			"option.on": "On",
			"option.off": "Off",
			"reset.label": "Reset",
			"discard": "Discard",
			"save": "Save",
			"saving": "Saving",
			"saveFailed": "Save did not land; your changes are still staged."
		};
		const zh = {
			"title": "want-a-init",
			"description": "控制每个 agent 都带上的 AGENTS.md 维护提醒段落。",
			"expand": "展开",
			"collapse": "折叠",
			"unsaved": "有未保存的修改",
			"readOnly": "当前部署的 settings 文档为只读；此处修改不会生效。",
			"field.maintenance": "维护提醒",
			"field.maintenance.hint": "向每个 agent 的 system prompt 追加一段简短的提醒，让模型在发现经核实的命令、架构事实、约定或陷阱时主动更新 AGENTS.md。/init 命令不受此开关影响。",
			"option.on": "开启",
			"option.off": "关闭",
			"reset.label": "重置",
			"discard": "放弃",
			"save": "保存",
			"saving": "保存中",
			"saveFailed": "保存未生效；改动暂存中。"
		};
		//#endregion
		//#region src/client/index.ts
		/** Dictionary namespace owned by this card. */
		const NS = "want-a-init";
		/** Keyed slot entry — must match the host's settingsNamespace('want-a-init'). */
		const KEY = "want-a-init";
		/** Required services: slot registry, locale registry, settings scope. */
		const inject = [
			"slots",
			"locale",
			"settingsScope"
		];
		/**
		* Client plugin body: register the card.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(() => {
				ctx.locale.register(NS, {
					zh,
					en
				});
			}, "want-a-init: card dictionary");
			ctx.slots.inject("settings.plugin.item", () => ctx.slots.register({
				name: "settings.plugin.item",
				key: KEY,
				locale: NS,
				inject: () => ({ scope: ctx.settingsScope.bind({ namespace: KEY }) })
			}, WantAInitCard));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map