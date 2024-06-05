import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  target: 'es2019',
  format: ['cjs', 'esm'],
  banner: { js: '"use client";' },
  sourcemap: true,
  minify: false,
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
      ts: `.${format}.ts`,
    };
  },
});
