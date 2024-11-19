import globals from "globals";

export const GLOB_PATTERNS = {
  JS: "**/*.{js,mjs,cjs,jsx}",
  TS: "**/*.{ts,tsx}",
  REACT: "**/*.{jsx,tsx}",
  STYLE: "**/*.{js,jsx,ts,tsx,vue,svelte}",
  JSON: "**/*.{json,json5,jsonc}",
  YAML: "**/*.{yml,yaml}",
  MARKDOWN: "**/*.md",
  TEST: "**/*.{test,spec}.{js,jsx,ts,tsx}",
  CONFIG: [
    "**/.*rc.{js,cjs,ts}",
    "**/*.config.{js,cjs,ts}",
    "**/vite.config.*",
    "**/vitest.config.*",
    "**/astro.config.*",
    "**/unocss.config.*",
    "**/tailwind.config.*",
  ],
  IGNORE: [
    "**/dist",
    "**/build",
    "**/coverage",
    "**/node_modules",
    "**/.git",
    "**/.vscode",
    "**/.idea",
    "**/auto-imports.d.ts",
    "**/components.d.ts",
  ],
};

export const LANGUAGE_OPTIONS = {
  ecmaVersion: 2024,
  sourceType: "module",
  globals: {
    ...globals.browser,
    ...globals.es2021,
    ...globals.node,
  },
};

export const SETTINGS = {
  react: {
    version: "detect",
  },
  "import/resolver": {
    typescript: true,
    node: true,
  },
};
