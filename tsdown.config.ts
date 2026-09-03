/**
 * tsdown config for the want-a-init client half.
 *
 * Emits the lazy-CJS factory format the loader's `/plugins/<id>/client.js`
 * route expects: the bundle calls `window.__ModuleLoader__.load({id,
 * factory})` and resolves externals through the injected `require` (the
 * module table, not Node's require). Modeled on dsh-user-approval's
 * config; the shared harness preset is not published so external plugins
 * reproduce the output format themselves.
 *
 * CSS Modules are inlined via lightningcss: `X.module.css` yields its
 * hashed class map and injects a tagged style at factory execution. Bare
 * specifiers in `EXTERNAL` stay external (module table answers them);
 * everything else inlines.
 */
import { defineConfig } from 'tsdown'
import { readFile } from 'node:fs/promises'
import { transform } from 'lightningcss'
import { basename, resolve, dirname } from 'node:path'

const PLUGIN_ID = 'want-a-init'

/**
 * Bare specifiers the loader's module table answers — every other
 * dependency is inlined into the bundle. Matches the client's runtime
 * `inject` plus react (loader baseline already includes react).
 *
 * DSH 0.1.2-rc.1: the legacy `@deepseek-ai/dsh-client-runtime` is split.
 * The settings-scope service now lives on
 * `@deepseek-ai/dsh-client-ui-settings`, and the slot registry merge on
 * `@deepseek-ai/dsh-client-ui-renderer`. The plugins section's typed slot
 * declaration (`settings.plugin.item`) still ships from
 * `@deepseek-ai/dsh-client-ui-settings-plugins` but is consumed through
 * type-only imports, so it does not need to be runtime-external.
 */
const EXTERNAL = [
  '@deepseek-ai/dsh-client-locale',
  '@deepseek-ai/dsh-client-ui-settings',
  '@deepseek-ai/dsh-client-ui-renderer',
  '@deepseek-ai/dsh-client-ui-primitives',
  'react',
]

/** Virtual-id wrapper keeping module CSS away from tsdown's own CSS
 * pipeline (which requires @tsdown/css). Suffix matters: tsdown's guard
 * matches ids ending in `.css`, so the virtual id must not. */
const CSS_VIRTUAL_PREFIX = '\0dsh-css:'
const CSS_VIRTUAL_SUFFIX = '.mjs'

export default defineConfig({
  entry: {
    client: 'src/client/index.ts',
  },
  outDir: 'lib',
  format: 'cjs',
  platform: 'browser',
  sourcemap: true,
  clean: false,
  deps: {
    neverBundle: EXTERNAL,
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    'import.meta.env.MODE': '"production"',
    'import.meta.env': '{"MODE":"production"}',
  },
  plugins: [
    {
      // CSS Modules inline plugin: read the source file, transform via
      // lightningcss with a hashed class pattern, return a module that
      // both injects the stylesheet at factory execution and exports
      // the class map.
      name: 'dsh-css-modules-inline',
      resolveId(source, importer) {
        if (!source.endsWith('.module.css')) return null
        const abs = importer ? resolve(dirname(importer), source) : source
        return CSS_VIRTUAL_PREFIX + abs + CSS_VIRTUAL_SUFFIX
      },
      async load(virtualId) {
        if (!virtualId.startsWith(CSS_VIRTUAL_PREFIX)) return null
        const fileId = virtualId.slice(CSS_VIRTUAL_PREFIX.length, -CSS_VIRTUAL_SUFFIX.length)
        this.addWatchFile(fileId)

        const source = await readFile(fileId)
        const { code, exports: cssExports } = transform({
          filename: fileId,
          code: source,
          cssModules: { pattern: '[hash]_[local]' },
          minify: true,
        })

        const classMap: Record<string, string> = {}
        for (const [local, exp] of Object.entries(cssExports || {})) {
          classMap[local] = exp.name
        }

        const css = code.toString()
        const tagId = `${PLUGIN_ID}/${basename(fileId)}`

        return [
          `const css = ${JSON.stringify(css)};`,
          `const tagId = ${JSON.stringify(tagId)};`,
          'if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {',
          '  const tag = document.createElement("style");',
          `  tag.dataset.plugin = ${JSON.stringify(PLUGIN_ID)};`,
          '  tag.dataset.pluginCss = tagId;',
          '  tag.textContent = css;',
          '  document.head.appendChild(tag);',
          '}',
          `export default ${JSON.stringify(classMap)};`,
        ].join('\n')
      },
    },
  ],
  outputOptions: {
    entryFileNames: 'client.js',
    // Lazy-CJS factory wrapper: the loader reads this file at
    // /plugins/<scoped-package>/client.js and calls the factory with a
    // `require` that resolves externals against the module table.
    banner: `window.__ModuleLoader__.load({ id: "${PLUGIN_ID}", factory: (require) => {`,
    footer: 'return module.exports; } });',
    intro: 'var module = { exports: {} }; var exports = module.exports;',
  },
})