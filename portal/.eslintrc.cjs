/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    // 'eslint:recommended',
    // '@vue/eslint-config-typescript/recommended',
    // '@vue/eslint-config-prettier'
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js', '.vue'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 2020,
    // project: './tsconfig.json',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'object-curly-newline': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-unresolved': 'off',
    'import/no-duplicates': 'off',
    'import/order': 'off',
    'import/no-cycle': 'off',
    'import/no-self-import': 'off',
    'import/no-relative-packages': 'off',
    'import/named': 0,
    'import/export': 0,
    'import/no-default-export': 0,
    'import/prefer-default-export': 0,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        'cypress/integration/**.spec.{js,ts,jsx,tsx}',
      ],
      extends: [
        'plugin:cypress/recommended',
      ],
    },
  ],
};
