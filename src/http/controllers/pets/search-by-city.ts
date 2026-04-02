import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeFetchPetByCityUseCase } from '@/use-cases/factories/make-fetch-pet-by-city-use-case'

export async function searchByCity(request: FastifyRequest, reply: FastifyReply) {
  const searchByCityParamSchema = z.object({
    city: z.string(),
  })

  const { city } = searchByCityParamSchema.parse(request.params)

  const fetchPetByCity = makeFetchPetByCityUseCase()
  const { pets } = await fetchPetByCity.execute({
    city,
  })

  return reply.status(200).send({
    pets,
  })
}
