import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['node_modules', 'dist', 'build'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'coverage/**',
        'dist/**',
        'build/**',
        '**/*.d.ts',
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*.{test,spec}.{js,cjs,mjs,ts,tsx,jsx}',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc}.config.*',
        '**/node_modules/**',
      ],
    },
    alias: {
      '~': './hooks/',
    },
    allowOnly: false,
    bail: 1,
    clearMocks: true,
    maxConcurrency: 10,
    minWorkers: 1,
    maxWorkers: 4,
    mockReset: true,
    silent: false,
    fileParallelism: true,
    watch: false,
    testTimeout: 5000,
    hookTimeout: 10000,
  },
});
