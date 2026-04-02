import type { FastifyReply, FastifyRequest } from 'fastify'

import { env } from '@/env'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const accessToken = await reply.jwtSign({
    sub: request.user.sub,
  })

  const refreshToken = await reply.jwtSign(
    {
      sub: request.user.sub,
    },
    {
      expiresIn: '7d',
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      accessToken,
    })
}
