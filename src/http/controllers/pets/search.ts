import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchSchema = z.object({
    age: z.number().optional(),
    name: z.coerce.string().optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGER']).optional(),
    energyLevel: z.enum(['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']).optional(),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    environment: z.enum(['SMALL', 'MEDIUM', 'LARGER']).optional(),
    page: z.coerce.number(),
  })

  const { age, name, size, energyLevel, independenceLevel, environment, page } = searchSchema.parse(
    request.query,
  )

  const searchPetUseCase = makeSearchPetUseCase()
  const { pets } = await searchPetUseCase.execute({
    filters: {
      age,
      name,
      size,
      energyLevel,
      independenceLevel,
      environment,
    },
    page: page,
  })

  return reply.status(200).send({ pets })
}
