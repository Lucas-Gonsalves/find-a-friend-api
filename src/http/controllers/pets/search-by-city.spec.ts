import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Search Pet By City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const { accessToken } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        age: 12,
        name: 'Rex',
        description: 'description',
        image: 'link-of-the-dog-image',
        size: 'MEDIUM',
        energyLevel: 'LOW',
        independenceLevel: 'MEDIUM',
        environment: 'SMALL',
        adoptionRequirement: ['It need a lot of love', 'It need aways to stay with you'],
      })

    const city = 'Guramirim'

    const response = await request(app.server)
      .get(`/pets/city/${city}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.pets[0]).toMatchObject({
      name: 'Rex',
    })
  })
})
