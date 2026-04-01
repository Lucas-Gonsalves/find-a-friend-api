import { afterAll, beforeEach } from 'vitest'

import { prisma } from '@/lib/prisma'

beforeEach(async () => {
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "pets", "orgs" RESTART IDENTITY CASCADE;')
})

afterAll(async () => {
  await prisma.$disconnect()
})
