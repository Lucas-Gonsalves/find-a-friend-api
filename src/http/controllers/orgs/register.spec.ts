import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new org', async () => {
    await request(app.server).post('/orgs').send({
      email: 'lucas@email.com',
      username: 'Lucas',
      cep: '89270000',
      address: 'Rold Scheturn',
      city: 'Guaramirim',
      phone: '(47) 9979-8754',
      password: '123456',
    })
    const response = await request(app.server).post('/orgs').send({
      email: 'lucas@email.com',
      username: 'Lucas',
      cep: '89270000',
      address: 'Rold Scheturn',
      city: 'Guaramirim',
      phone: '(47) 9979-8754',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
  })
})
