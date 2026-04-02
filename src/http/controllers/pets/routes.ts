import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middleware/verify-jwt'

import { citySearchPet } from './city-search-pet'
import { createPet } from './create-pet'
import { searchPet } from './search-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', createPet)
  app.get('/pets/:city', citySearchPet)
  app.get('/pets', searchPet)
}
