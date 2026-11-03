import eslintReact from '@eslint-react/eslint-plugin'
import js from '@eslint/js'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import eslintConfigPrettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import risxss from 'eslint-plugin-risxss'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import storybook from 'eslint-plugin-storybook'
import tseslint from 'typescript-eslint'

export default [
  js.configs.recommended,
  ...tseslint.configs.strict,
  eslintReact.configs['recommended-typescript'],
  reactHooks.configs.flat.recommended,
  ...tanstackQuery.configs['flat/recommended'],
  ...storybook.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      risxss,
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@tanstack/query/exhaustive-deps': 'off',
      'risxss/catch-potential-xss-react': 'error',
      'no-shadow': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]
