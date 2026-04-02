import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Refresh Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/orgs').send({
      email: 'lucas@email.com',
      username: 'Lucas',
      cep: '89270000',
      address: 'Rold Scheturn',
      city: 'Guaramirim',
      phone: '(47) 9979-8754',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/session').send({
      email: 'lucas@email.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')!

    const refreshResponse = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(refreshResponse.statusCode).toBe(200)
    expect(refreshResponse.body).toMatchObject({
      accessToken: expect.any(String),
    })
    expect(refreshResponse.get('Set-Cookie')).toEqual([expect.stringContaining('refreshToken=')])
  })
})
