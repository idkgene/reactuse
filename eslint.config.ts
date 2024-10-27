/**
 * TypeScript support in ESLint is  experimental. 
 * 
 * Once Node.js natively supports TypeScript configuration files, this feature will no longer be considered experimental.
 * 
 * If this feature breaks or becomes unstable, we revert to using a JavaScript configuration file.
 */
import js from '@eslint/js';
import type { Linter } from 'eslint';

export default [
  js.configs.recommended,
  {
    rules: {
      'no-console': [0],
    },
  },
] satisfies Linter.Config[];
