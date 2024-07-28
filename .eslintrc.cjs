const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: [
    ...[
      '@vercel/style-guide/eslint/node',
      '@vercel/style-guide/eslint/typescript',
      '@vercel/style-guide/eslint/browser',
      '@vercel/style-guide/eslint/typescript',
      '@vercel/style-guide/eslint/react',
      '@vercel/style-guide/eslint/next',
      '@vercel/style-guide/eslint/vitest',
    ].map(require.resolve),
    'plugin:tailwindcss/recommended',
  ],
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    tailwindcss: {
      config: resolve(process.cwd(), './tailwind.config.ts'),
      callees: ['clsx', 'cva', 'cn'],
    },
    'import/resolver': {
      typescript: {
        project,
      },  
    },
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
    // Next.js routes
    'import/no-default-export': 'off',

    // handled by typescript eslint
    'import/default': 'off',
    'import/export': 'off',
    'import/namespace': 'off',
    'import/no-unresolved': 'off',

    '@next/next/no-html-link-for-pages': 'off',
    'tailwindcss/no-custom-classname': [
      'warn',
      {
        whitelist: [
          'bg-(primary|destructive|secondary)(|/90|/80)?',
          'text-(primary|destructive|secondary|foreground)(-foreground)?',
          'hover:bg-(primary|destructive|accent|secondary)(|/90|/80)?',
          'hover:text-(accent|secondary)-foreground',
          'border-input',
          'bg-background',
          'h-10',
          'border',
          'px-4',
          'py-2',
          'underline-offset-4',
          'hover:underline',
          'zoom-in-95',
        ],
      },
    ],
  },
};
