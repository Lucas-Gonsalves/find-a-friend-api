import type { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { register } from './register'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/session', authenticate)
  app.patch('/token/refresh', refresh)
}
