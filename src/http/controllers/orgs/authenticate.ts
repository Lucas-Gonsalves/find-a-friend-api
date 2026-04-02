import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { org } = await authenticateUseCase.execute({ email, password })

    const accessToken = await reply.jwtSign({
      sub: org.id,
    })

    const refreshToken = await reply.jwtSign(
      {
        sub: org.id,
      },
      {
        expiresIn: '7d',
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        accessToken,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }
  }

  return reply.status(201).send()
}
