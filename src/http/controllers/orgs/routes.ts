import type { FastifyInstance } from 'fastify'

import { search } from './search'

export async function orgsRoutes(app: FastifyInstance) {
  app.get('/orgs/search', search)
}
