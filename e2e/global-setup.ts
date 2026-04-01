import { execSync } from 'node:child_process'

const TEST_DATABASE_URL = 'postgresql://docker:docker@localhost:5433/findafrienddb_test'

export default function globalSetup() {
  process.env.NODE_ENV = 'test'
  process.env.DATABASE_URL = TEST_DATABASE_URL

  execSync('npx prisma migrate reset --force', {
    stdio: 'inherit',
    env: process.env,
  })
}
