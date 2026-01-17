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
