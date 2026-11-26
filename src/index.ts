/**********************************************************************
 * Copyright (C) 2026 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

import type { Config } from 'eslint/config';
import { defineConfig } from 'eslint/config';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

/** Files parsed with `@typescript-eslint/parser`. */
const TYPESCRIPT_FILES = ['**/*.ts', '**/*.mts', '**/*.cts'];

/** Files parsed with `svelte-eslint-parser`, `<script lang="ts">` is handed to `@typescript-eslint/parser`. */
const SVELTE_FILES = ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'];

/**
 * Shared ESLint configuration for Podman Desktop repositories.
 *
 * Registers the `typescript-eslint` plugin (for every file, so `@typescript-eslint/*`
 * rules can be configured) and the parsers for TypeScript and Svelte files. 
 */
const config: Config[] = defineConfig([
  {
    name: '@podman-desktop/eslint-config/typescript-plugin',
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
  },
  {
    name: '@podman-desktop/eslint-config/typescript-parser',
    files: TYPESCRIPT_FILES,
    languageOptions: {
      parser: tseslint.parser,
    },
  },
  {
    name: '@podman-desktop/eslint-config/svelte-parser',
    files: SVELTE_FILES,
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.svelte'],
      },
    },
  },
]);

export default config;
