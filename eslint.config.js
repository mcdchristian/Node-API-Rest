import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/', 'dist/', '.next/', '.nuxt/'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    plugins: {
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: 'error',
      'brace-style': ['error', '1tbs'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'prettier/prettier': 'error',
    },
  },
];
