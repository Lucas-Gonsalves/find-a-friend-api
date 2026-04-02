import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Search Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city and categories', async () => {
    const { accessToken } = await createAndAuthenticateOrg(app)
    const { accessToken: secondOrgAccessToken } = await createAndAuthenticateOrg(app, {
      username: 'Gabriel',
      email: 'gabrielorg@example.com',
      city: 'Jaragua do Sul',
    })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        age: 16,
        name: 'Moon',
        description: 'description',
        image: 'link-of-the-dog-image',
        size: 'MEDIUM',
        energyLevel: 'HIGH',
        independenceLevel: 'MEDIUM',
        environment: 'SMALL',
        adoptionRequirement: ['It need a lot of love', 'It need aways to stay with you'],
      })

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
        adoptionRequirement: ['It need a lot of love'],
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${secondOrgAccessToken}`)
      .send({
        age: 8,
        name: 'Bolt',
        description: 'description',
        image: 'link-of-the-other-dog-image',
        size: 'MEDIUM',
        energyLevel: 'HIGH',
        independenceLevel: 'MEDIUM',
        environment: 'SMALL',
        adoptionRequirement: ['It need a lot of love'],
      })

    const response = await request(app.server)
      .get('/pets')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ city: 'Guramirim', energyLevel: 'HIGH', page: 1 })

    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets[0]).toMatchObject({
      name: 'Moon',
    })
  })
})
