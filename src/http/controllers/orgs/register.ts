import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.email(),
    username: z.string(),
    cep: z.string(),
    address: z.string(),
    city: z.string(),
    phone: z.string(),
    password: z.string(),
  })

  const { email, username, cep, address, city, phone, password } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeCreateOrgUseCase()
    registerUseCase.execute({ email, username, cep, address, city, phone, password })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }

  return reply.status(201).send()
}
