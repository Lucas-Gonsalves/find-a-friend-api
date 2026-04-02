import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '@/lib/prisma'

interface CreateAndAuthenticateOrgOverrides {
  username?: string
  email?: string
  password?: string
  phone?: string
  city?: string
  cep?: string
  address?: string
}

export async function createAndAuthenticateOrg(
  app: FastifyInstance,
  overrides: CreateAndAuthenticateOrgOverrides = {},
) {
  const password = overrides.password ?? '123456'

  await prisma.org.create({
    data: {
      username: overrides.username ?? 'Lucas',
      email: overrides.email ?? 'org@example.com',
      password_hash: await hash(password, 6),
      phone: overrides.phone ?? '(47) 99630-7545',
      city: overrides.city ?? 'Guramirim',
      cep: overrides.cep ?? '89270-000',
      address: overrides.address ?? 'Rolf passold',
    },
  })

  const authResponse = await request(app.server).post('/session').send({
    email: overrides.email ?? 'org@example.com',
    password,
  })

  const { accessToken } = authResponse.body

  return { accessToken }
}
