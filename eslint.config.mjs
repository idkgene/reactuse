import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,

  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
    arrowParens: 'always',
    bracketSpacing: true,
  },

  react: {
    hooks: true,
    overrides: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
    }
  },

  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'interface'],
      'ts/no-explicit-any': 'warn',
      'ts/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      'ts/explicit-function-return-type': 'warn',
      'ts/no-non-null-assertion': 'warn'
    }
  },

  imports: {
    overrides: {
      'import/order': ['error', {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true
        }
      }]
    }
  },

  ignores: [
    'dist',
    'node_modules',
    'public',
    'coverage',
    '*.min.js',
    '*.d.ts'
  ],

  formatters: {
    css: true,
    html: true,
    markdown: 'prettier'
  }
})
