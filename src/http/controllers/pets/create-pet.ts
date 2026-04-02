import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    age: z.number(),
    name: z.string(),
    description: z.string(),
    image: z.string(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGER']),
    energyLevel: z.enum(['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    environment: z.enum(['SMALL', 'MEDIUM', 'LARGER']),
    adoptionRequirement: z.array(z.string()),
  })

  const petData = createPetBodySchema.parse(request.body)

  const orgId = request.user.sub

  const createPetUseCase = makeCreatePetUseCase()
  await createPetUseCase.execute({
    ...petData,
    orgId,
  })

  return reply.status(201).send()
}
