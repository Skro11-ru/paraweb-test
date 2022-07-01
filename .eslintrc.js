module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 'latest', parser: '@typescript-eslint/parser' },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'vue/require-default-prop': 0,
    'no-console': 1,
    'no-debugger': 1,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'no-plusplus': 0,
    'prettier/prettier': 2,
    'import/no-extraneous-dependencies': 0,
  },
  ignorePatterns: ['node_modules/', 'dist/', '**/*.json', '**/*.d.ts'],
};
