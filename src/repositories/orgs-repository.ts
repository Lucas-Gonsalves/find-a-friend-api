import type { Org, Prisma } from 'generated/prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org | null>
}
