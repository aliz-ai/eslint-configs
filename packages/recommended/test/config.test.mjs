import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { ESLint } from 'eslint'
import config from '../index.mjs'

const eslint = new ESLint({ overrideConfigFile: true, overrideConfig: config })

async function lint(code, filePath = 'src/Example.tsx') {
  const [result] = await eslint.lintText(code, { filePath })
  return result.messages
}

function ruleIdsOf(messages) {
  return messages.map(message => message.ruleId)
}

describe('recommended config', () => {
  it('accepts a clean React component', async () => {
    const messages = await lint(`import { useState } from 'react'

export function Counter({ initial }: { initial: number }) {
  const [count, setCount] = useState(initial)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
`)
    assert.deepEqual(messages, [])
  })

  it('reports conditionally called hooks', async () => {
    const messages = await lint(`import { useState } from 'react'

export function Toggle({ enabled }: { enabled: boolean }) {
  if (enabled) {
    useState(0)
  }
  return null
}
`)
    assert.ok(ruleIdsOf(messages).includes('react-hooks/rules-of-hooks'))
  })

  it('reports missing effect dependencies', async () => {
    const messages = await lint(`import { useEffect } from 'react'

export function Title({ title }: { title: string }) {
  useEffect(() => {
    document.title = title
  }, [])
  return null
}
`)
    assert.ok(ruleIdsOf(messages).includes('react-hooks/exhaustive-deps'))
  })

  it('reports unsorted imports', async () => {
    const messages = await lint(`import { b } from './b'
import { a } from './a'

export const sum = a + b
`, 'src/sum.ts')
    assert.ok(ruleIdsOf(messages).some(ruleId => ruleId?.includes('sort')))
  })

  it('reports potential XSS', async () => {
    const messages = await lint(`export function Html({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
`)
    assert.ok(ruleIdsOf(messages).includes('risxss/catch-potential-xss-react'))
  })

  it('warns on explicit any', async () => {
    const messages = await lint('export const value: any = 1\n', 'src/value.ts')
    assert.ok(ruleIdsOf(messages).includes('@typescript-eslint/no-explicit-any'))
  })

  it('applies storybook rules to stories', async () => {
    const messages = await lint('export const Primary = {}\n', 'src/Button.stories.tsx')
    assert.ok(ruleIdsOf(messages).includes('storybook/default-exports'))
  })
})
