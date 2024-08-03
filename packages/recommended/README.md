# @aliz.ai/eslint-config-recommended

This package is a [shareable eslint config](https://eslint.org/docs/latest/extend/shareable-configs).
You can use it to easily configure eslint on your project according to Aliz standards.

## Installation and Usage

### 1. Install

```bash
npm i @aliz.ai/eslint-config-recommended -D
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
    - JS import sort
- TS recommended
- Prettier
- React 
- React hooks
- RisXSS

- Tanstack Query
- Storybook