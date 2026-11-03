# @aliz.ai/eslint-config-recommended

This package is a [shareable eslint config](https://eslint.org/docs/latest/extend/shareable-configs).
You can use it to easily configure eslint on your project according to Aliz standards.

## Requirements

- ESLint 10
- Node.js `^20.19.0 || ^22.13.0 || >=24`
- TypeScript `>=5.6.0 <6.1.0` (the range supported by both typescript-eslint and the TanStack Query plugin)

## Installation and Usage

### 1. Install

```bash
npm i "@aliz.ai/eslint-config-recommended" eslint -D
```

### 2. Add to your eslint config

```js
// eslint.config.js
import alizConfig from "@aliz.ai/eslint-config-recommended";

export default [
    ...alizConfig
    //your additional configs come here, if any
]
```

## Contents

### Rules
- JS recommended
    - Import sort ([simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort))
- TS strict ([typescript-eslint](https://typescript-eslint.io/))
- Prettier
- React ([@eslint-react](https://eslint-react.xyz/), `recommended-typescript`)
- React hooks (`recommended`, including the React Compiler rules)
- RisXSS
- Tanstack Query
- Storybook (`recommended`, applied to `*.stories.*` and `.storybook/main.*`)

## Migrating from 1.x

2.0 requires ESLint 10 and contains breaking changes:

- `eslint-plugin-react` is replaced by `@eslint-react/eslint-plugin`, because `eslint-plugin-react` does not support ESLint 10.
  Rules are prefixed with `@eslint-react/` instead of `react/`, so update any rule overrides and `eslint-disable` comments.
- `eslint-plugin-sort-imports-es6-autofix` is replaced by `eslint-plugin-simple-import-sort`.
  Run `eslint --fix` once to re-sort imports.
- React hooks and Storybook rules are now actually enabled. In 1.x the plugins were registered but no rules were turned on,
  so expect new findings, for example from `react-hooks/exhaustive-deps` and the React Compiler rules.
