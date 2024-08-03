import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import risxss from 'eslint-plugin-risxss'
import sortImportsEs6Autofix from 'eslint-plugin-sort-imports-es6-autofix'
import storybook from 'eslint-plugin-storybook'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import tseslint from 'typescript-eslint'

export default [
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...fixupConfigRules(prettier),
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  ...tanstackQuery.configs['flat/recommended'],
  {
    plugins: {
      'sort-imports-es6-autofix': fixupPluginRules(sortImportsEs6Autofix),
      'react-hooks': fixupPluginRules(reactHooks),
      risxss: fixupPluginRules(risxss),
      storybook: fixupPluginRules(storybook),
    },
    rules: {
      'sort-imports-es6-autofix/sort-imports-es6': 'warn',
      '@tanstack/query/exhaustive-deps': 'off',
      'risxss/catch-potential-xss-react': 'error',
      'no-shadow': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
