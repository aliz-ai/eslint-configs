// Fails when a lockfile adds or changes a package version published less than MIN_AGE_DAYS ago.
// `npm ci` installs locked versions without applying npm's min-release-age, so this covers
// lockfiles that were edited by hand or generated without the gate.
// Usage: node scripts/check-lockfile-release-age.mjs <lockfile> [base git ref]
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const MIN_AGE_DAYS = 7
const REGISTRY = 'https://registry.npmjs.org/'
const EMPTY_LOCKFILE = '{"packages":{}}'

const [lockfilePath, baseRef] = process.argv.slice(2)

function lockedVersions(lockfileText) {
  const versions = new Map()
  for (const [path, entry] of Object.entries(JSON.parse(lockfileText).packages)) {
    if (!path || !entry.resolved?.startsWith(REGISTRY)) continue
    const name = entry.name ?? path.slice(path.lastIndexOf('node_modules/') + 'node_modules/'.length)
    versions.set(`${name}@${entry.version}`, { name, version: entry.version })
  }
  return versions
}

function readBaseLockfile() {
  if (!baseRef) return EMPTY_LOCKFILE
  try {
    return execFileSync('git', ['show', `${baseRef}:${lockfilePath}`], { encoding: 'utf8', stdio: 'pipe' })
  } catch {
    // The base ref has no lockfile (or is unknown), so every locked version counts as new
    return EMPTY_LOCKFILE
  }
}

async function publishTimes(name) {
  const response = await fetch(REGISTRY + name.replace('/', '%2F'))
  if (!response.ok) throw new Error(`Registry lookup for ${name} failed: ${response.status}`)
  return (await response.json()).time
}

const baseVersions = lockedVersions(readBaseLockfile())
const newVersions = [...lockedVersions(readFileSync(lockfilePath, 'utf8')).entries()]
  .filter(([key]) => !baseVersions.has(key))
  .map(([, locked]) => locked)

const versionsByName = Map.groupBy(newVersions, locked => locked.name)
const cutoff = Date.now() - MIN_AGE_DAYS * 24 * 60 * 60 * 1000
const tooYoung = []

const names = [...versionsByName.keys()]
const CONCURRENCY = 10
for (let start = 0; start < names.length; start += CONCURRENCY) {
  await Promise.all(names.slice(start, start + CONCURRENCY).map(async name => {
    const times = await publishTimes(name)
    for (const { version } of versionsByName.get(name)) {
      const published = times[version]
      if (!published || new Date(published).getTime() > cutoff) {
        tooYoung.push(`${name}@${version} (published ${published ?? 'unknown'})`)
      }
    }
  }))
}

console.log(`Checked ${newVersions.length} new or changed locked versions against a ${MIN_AGE_DAYS}-day minimum age.`)
if (tooYoung.length > 0) {
  console.error(`Locked versions younger than ${MIN_AGE_DAYS} days:\n${tooYoung.map(entry => `  ${entry}`).join('\n')}`)
  process.exit(1)
}
