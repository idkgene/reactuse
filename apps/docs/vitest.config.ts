/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["**/src/**"],
      exclude: ["**/__tests__/**", "**/*.test.*"],
    },
    typecheck: {
      include: ["**/*.test-d.{ts,tsx}"],
      tsconfig: "./tsconfig.json",
      ignoreSourceErrors: false,
    },
  },
});
