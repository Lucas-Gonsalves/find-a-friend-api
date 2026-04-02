import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Search Pet By Id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a pet by id', async () => {
    const { accessToken } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    const pet = await prisma.pet.create({
      data: {
        age: 12,
        name: 'Rex',
        description: 'description',
        image: 'link-of-the-dog-image',
        size: 'MEDIUM',
        energy_level: 'LOW',
        independence_level: 'MEDIUM',
        environment: 'SMALL',
        adoption_requirement: ['It need a lot of love', 'It need aways to stay with you'],
        org_id: org.id,
      },
    })

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.pet).toMatchObject({
      name: 'Rex',
    })
  })
})
