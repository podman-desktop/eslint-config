# eslint-config

Shared ESLint config enforcing @podman-desktop's code style.

The config registers:

- the `typescript-eslint` plugin, for every file;
- `@typescript-eslint/parser` for `**/*.ts`, `**/*.mts` and `**/*.cts` files;
- `svelte-eslint-parser` for `**/*.svelte`, `**/*.svelte.ts` and `**/*.svelte.js` files, with
  `@typescript-eslint/parser` parsing `<script lang="ts">`.

No rule is enabled yet: rules are added one by one.

`parserOptions` (`project`, `projectService`) is not set by the shared config: it stays in each
repository.

## Usage

`typescript-eslint`, `svelte-eslint-parser` and `svelte` are peer dependencies: the config exposes
the `typescript-eslint` plugin, and a second copy fails with
`Cannot redefine plugin "@typescript-eslint"`. npm and pnpm install peer dependencies automatically.

```sh
pnpm add -D @podman-desktop/eslint-config
```

## Ordering

A config listed later wins. No preset is required: repository specific settings (`parserOptions`,
rules) go **after** the shared config, so they override it.

```js
// ✅ the repository configuration comes after the shared config
export default defineConfig([
  ...podmanDesktop,
  // svelte parser, parserOptions (project / projectService), rules...
]);
```

```js
// ❌ the shared config comes after the repository configuration
// and overrides the svelte parser, parserOptions and rules
export default defineConfig([
  // svelte parser, parserOptions (project / projectService), rules...
  ...podmanDesktop,
]);
```

## Development

```sh
pnpm install
pnpm build
pnpm lint:check
pnpm typecheck
```

This repository is linted with its own configuration (see [`eslint.config.ts`](./eslint.config.ts)).
