import js from "@eslint/js";
import * as parser from "@typescript-eslint/parser";
import * as tseslint from "@typescript-eslint/eslint-plugin";
import reactPlugin from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import stylistic from "@stylistic/eslint-plugin";
import antfu from "eslint-plugin-antfu";
import jsdoc from "eslint-plugin-jsdoc";
import n from "eslint-plugin-n";
import unicorn from "eslint-plugin-unicorn";
import unused from "eslint-plugin-unused-imports";
import perfectionist from "eslint-plugin-perfectionist";
import regexp from "eslint-plugin-regexp";
import noOnlyTests from "eslint-plugin-no-only-tests";
import eslintComments from "@eslint-community/eslint-plugin-eslint-comments";
import markdown from "@eslint/markdown";
import globals from "globals";

import jsonc from "jsonc-eslint-parser";
import yaml from "yaml-eslint-parser";

const GLOB_JS = "**/*.{js,mjs,cjs,jsx}";
const GLOB_TS = "**/*.{ts,tsx}";
const GLOB_REACT = "**/*.{jsx,tsx}";
const GLOB_STYLE = "**/*.{js,jsx,ts,tsx,vue,svelte}";
const GLOB_JSON = "**/*.{json,json5,jsonc}";
const GLOB_YAML = "**/*.{yml,yaml}";
const GLOB_MARKDOWN = "**/*.md";
const GLOB_TEST = "**/*.{test,spec}.{js,jsx,ts,tsx}";
const GLOB_CONFIG = [
  "**/.*rc.{js,cjs,ts}",
  "**/*.config.{js,cjs,ts}",
  "**/vite.config.*",
  "**/vitest.config.*",
  "**/astro.config.*",
  "**/unocss.config.*",
  "**/tailwind.config.*",
];
const GLOB_IGNORE = [
  "**/dist",
  "**/build",
  "**/coverage",
  "**/node_modules",
  "**/.git",
  "**/.vscode",
  "**/.idea",
  "**/auto-imports.d.ts",
  "**/components.d.ts",
];

const languageOptions = {
  ecmaVersion: 2024,
  sourceType: "module",
  globals: {
    ...globals.browser,
    ...globals.es2021,
    ...globals.node,
  },
};

const settings = {
  react: {
    version: "detect",
  },
  "import/resolver": {
    typescript: true,
    node: true,
  },
};

const config = [
  {
    files: [GLOB_JS],
    ...js.configs.recommended,
    languageOptions,
    plugins: {
      "eslint-comments": eslintComments,
      antfu,
      unicorn,
      "unused-imports": unused,
      perfectionist,
      regexp,
      n,
    },
    rules: {
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "unicorn/prefer-module": "error",
      "unicorn/filename-case": [
        "error",
        { cases: { camelCase: true, pascalCase: true } },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
          "newlines-between": "always",
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
        },
      ],
      "n/no-deprecated-api": "warn",
      "regexp/no-unused-capturing-group": "error",
    },
  },

  {
    files: [GLOB_TS],
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      jsdoc,
    },
    settings,
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "no-public" },
      ],
      "@typescript-eslint/method-signature-style": ["error", "property"],
      "jsdoc/require-jsdoc": [
        "warn",
        {
          publicOnly: true,
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
        },
      ],
      "jsdoc/require-param-type": "off",
      "jsdoc/require-returns-type": "off",
    },
  },

  {
    files: [GLOB_REACT],
    plugins: {
      "@eslint-react": reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      ...settings,
      react: {
        version: "detect",
        componentWrapperFunctions: ["memo", "forwardRef"],
      },
    },
    rules: {
      "@eslint-react/no-unused-class-component-methods": "error",
      "@eslint-react/no-array-index-key": "warn",
      "@eslint-react/no-unstable-default-props": "error",
      "@eslint-react/hook-use-state": "error",
      "@eslint-react/no-constructed-context-values": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  {
    files: [GLOB_STYLE],
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/semi": ["error", "always"],
      "@stylistic/quotes": ["error", "single"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/brace-style": ["error", "1tbs"],
      "@stylistic/member-delimiter-style": [
        "error",
        {
          multiline: { delimiter: "semi", requireLast: true },
          singleline: { delimiter: "semi", requireLast: false },
        },
      ],
    },
  },

  {
    files: [GLOB_JSON],
    languageOptions: {
      parser: jsonc,
    },
    plugins: {
      jsonc: await import("eslint-plugin-jsonc"),
    },
    rules: {
      "jsonc/no-comments": "off",
      // 'jsonc/sort-keys': 'error',
      "jsonc/comma-dangle": ["error", "never"],
    },
  },

  {
    files: [GLOB_YAML],
    languageOptions: {
      parser: yaml,
    },
    plugins: {
      yml: await import("eslint-plugin-yml"),
    },
    rules: {
      "yml/no-empty-mapping-value": "error",
      "yml/no-empty-sequence-entry": "error",
      "yml/no-multiple-empty-lines": "error",
      "yml/quotes": ["error", { prefer: "single" }],
      "yml/sort-keys": "error",
    },
  },

  {
    files: [GLOB_MARKDOWN],
    processor: markdown,
    plugins: {
      markdown: markdown,
    },
    rules: {
      "markdown/consistent-header-style": "error",
      "markdown/no-empty-links": "error",
      "markdown/no-trailing-spaces": "error",
    },
  },

  {
    files: [GLOB_TEST],
    plugins: {
      vitest: await import("@vitest/eslint-plugin"),
      "no-only-tests": noOnlyTests,
    },
    rules: {
      "vitest/expect-expect": [
        "error",
        { assertFunctionNames: ["expect", "assert"] },
      ],
      "vitest/no-disabled-tests": "warn",
      "vitest/no-focused-tests": "error",
      "vitest/prefer-strict-equal": "error",
      "vitest/prefer-to-be": "error",
      "no-only-tests/no-only-tests": "error",
    },
  },

  {
    files: GLOB_CONFIG,
    rules: {
      "import/no-default-export": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "unicorn/prefer-module": "off",
    },
  },

  {
    ignores: GLOB_IGNORE,
  },
];

export default config;
