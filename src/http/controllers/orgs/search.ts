import type { FastifyReply, FastifyRequest } from 'fastify'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  return reply.send({ message: 'Hello, you are in org get route' })
}
