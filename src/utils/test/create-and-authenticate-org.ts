import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      username: 'Lucas',
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      phone: '(47) 99630-7545',
      city: 'Guramirim',
      cep: '89270-000',
      address: 'Rolf passold',
    },
  })

  const authResponse = await request(app.server).post('/session').send({
    email: 'org@example.com',
    password: '123456',
  })

  const { accessToken } = authResponse.body

  return { accessToken }
}
