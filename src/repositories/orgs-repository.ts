import type { Org, Prisma } from 'generated/prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
  findManyByCity(city: string): Promise<Org[]>
}
