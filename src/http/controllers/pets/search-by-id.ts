import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFetchPetByIdUseCase } from '@/use-cases/factories/make-fetch-pet-by-id-use-case'

export async function searchById(request: FastifyRequest, reply: FastifyReply) {
  const searchByIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = searchByIdParamsSchema.parse(request.params)

  try {
    const fetchPetByIdUseCase = makeFetchPetByIdUseCase()
    const { pet } = await fetchPetByIdUseCase.execute({
      id,
    })
    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
