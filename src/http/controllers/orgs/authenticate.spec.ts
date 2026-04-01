import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Authenticate Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      email: 'lucas@email.com',
      username: 'Lucas',
      cep: '89270000',
      address: 'Rold Scheturn',
      city: 'Guaramirim',
      phone: '(47) 9979-8754',
      password: '123456',
    })

    const response = await request(app.server).post('/session').send({
      email: 'lucas@email.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.accessToken).toBeDefined()
  })

  it('should not be able to authenticate with wrong credentials', async () => {
    await request(app.server).post('/orgs').send({
      email: 'lucas@email.com',
      username: 'Lucas',
      cep: '89270000',
      address: 'Rold Scheturn',
      city: 'Guaramirim',
      phone: '(47) 9979-8754',
      password: '123456',
    })

    const response = await request(app.server).post('/session').send({
      email: 'lucas@email.com',
      password: 'wrong password',
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      message: 'Invalid credentials',
    })
  })
})
