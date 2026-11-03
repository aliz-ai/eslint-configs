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

Development requires the Node.js version in [`.nvmrc`](./.nvmrc) (Node 24 with npm 11.10 or newer, enforced via `devEngines`).

CI runs these tests on every pull request. Dependencies are pinned to exact versions, and only releases at least 7 days old are accepted:
npm enforces this when resolving (`.npmrc`), Dependabot through its cooldown, and CI checks every new or changed lockfile entry
with [`scripts/check-lockfile-release-age.mjs`](./scripts/check-lockfile-release-age.mjs).
