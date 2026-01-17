# CLAUDE.md

Project: @tzie/components-react (private) - a React component library built with Vite + TypeScript.

Notes
- AGENTS.md rule 1 now explicitly says to update CLAUDE.md instead of AGENTS.md.

Tech + build
- Tooling: Vite (rolldown-vite), React 19, TypeScript, CSS Modules, PostCSS nesting, ESLint/Prettier.
- Library build: `vite.config.ts` builds ES/CJS to `dist/index.mjs` + `dist/index.cjs` and emits types via `unplugin-dts`.
- Package entrypoints: `package.json` exports `./dist/index.{mjs,cjs,d.ts}`.
- Externalized deps: `react`, `react-dom`.

Design system approach
- Core tokens come from `@tzie/tokens` and are referenced via CSS variables.
- Local token helpers in `src/tokens/` map semantic props to CSS Modules class names and inline CSS vars.
- Base component class helper in `src/components/component.ts` provides shared class names and data-* typing.
- Styling/theme alignment (inferred from code):
  - Components should be theme-agnostic and rely on token CSS variables, not hard-coded colors.
  - Visual variants should be applied via token helpers (elevation/shape/typography/variant/focusable/spacing) and CSS Modules.
  - `App` sets global resets and loads token CSS; per-component styles should not re-define base tokens.
  - Focus visuals are delegated to `focusable` tokens (`.tz-focusable` + `.tz-focus-ring-target`), not bespoke outlines.
  - Theme selection is via `data-theme` on `:root`; components should respond to token variable changes without internal state.

Theme mechanism
- Theme values live in the tokens CSS as `:root` variables with theme overrides in `:root[data-theme="..."]`.
- The React package does not provide a theme provider; consumers are expected to set `data-theme` on `:root`/`html` (or inject different token CSS).
- Direction agreed: dynamic theme at runtime, constrained to `@tzie/tokens` schema, keep `data-theme`, and support SSR/SSG/ISR (React-only scope).
- Theme decisions: base tokens come from `@tzie/tokens` CSS; SSR can skip injecting theme CSS if it doesn't harm SSR/hydration; `ThemeProvider` is optional and theme input is via `App` props.
- Implemented theme plumbing: `App` accepts `theme`/`themes` and `defaultTheme` props, generates `:root[data-theme="..."]` CSS via `buildThemesCss`, and uses `useTheme` to set `data-theme` on `document.documentElement`.
- `useTheme` provides a shared hook to read/set `data-theme` for future App-external theme toggles.
- Theme CSS generator now uses `TzieTheme` directly (the upstream type is now optional-friendly).

Source layout (src/)
- `components/`: App, Text, Button, CircularLoader, (Accordion stub, not exported).
- `tokens/`: elevation, shape, spacing, typography, variant, focusable.
- `utils/`: `Modify` type helper.
- `Demo.tsx` is a local playground rendered by `main.tsx`.

Current state / notable gaps
- `src/index.ts` is empty, but used as the library entry in `vite.config.ts`.
- `src/index.ts` now re-exports `components`, `tokens`, and the `Modify` type from `utils` to form the public API surface.
- `components/Accordion/Accordion.tsx` is incomplete (no render) and not exported.
- Demo imports `./../dist/css/tokens.css` while App imports `@tzie/tokens/tokens.css`.
