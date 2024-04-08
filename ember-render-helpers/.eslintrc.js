'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'ember',
    '@typescript-eslint',
    'simple-import-sort',
    'typescript-sort-keys',
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:typescript-sort-keys/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    curly: 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.gjs', '.gts', '.js', '.ts'],
      },
      typescript: true,
    },
  },
  overrides: [
    // TypeScript and JavaScript files
    {
      files: ['**/*.{gjs,gts,js,ts}'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        'import/no-duplicates': 'error',
        'import/no-unresolved': [
          'error',
          { ignore: ['^@ember', '^dummy/', '^ember', 'fetch'] },
        ],
      },
    },
    // Node files (v2 addon)
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.stylelintrc.js',
        './.template-lintrc.js',
        './addon-main.cjs',
        './blueprints/*/index.js',
        './rollup.config.mjs',
      ],
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
  ],
};
