import type { Environment } from 'vitest/runtime'
import { builtinEnvironments } from 'vitest/runtime'

const TEST_DATABASE_URL = 'postgresql://docker:docker@localhost:5433/findafrienddb_test'

export default <Environment>{
  name: 'custom-node-e2e',
  viteEnvironment: 'ssr',
  async setup(global, options) {
    process.env.NODE_ENV = 'test'
    process.env.DATABASE_URL = TEST_DATABASE_URL

    return builtinEnvironments.node.setup(global, options)
  },
}
