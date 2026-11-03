# eslint-configs
Shareable eslint configs by Aliz, mainly for internal use.
See packages for more information on how to install and use these eslint configs.

## Packages

[@aliz.ai/eslint-config-recommended](./packages/recommended/README.md)
## Development

Each package has tests that lint small code snippets against the exported config:

```bash
cd packages/recommended
npm ci
npm test
```

CI runs these tests on every pull request. Dependencies are pinned to exact versions,
and both npm (`.npmrc`) and Dependabot only accept releases that are at least 7 days old.
