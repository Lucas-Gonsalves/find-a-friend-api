import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middleware/verify-jwt'

import { create } from './create'
import { search } from './search'
import { searchByCity } from './search-by-city'
import { searchById } from './search-by-id'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/pets', search)
  app.get('/pets/:id', searchById)
  app.get('/pets/city/:city', searchByCity)

  app.post('/pets', create)
}
