import type { OrgCreateInput } from 'generated/prisma/models'

import { prisma } from '@/lib/prisma'

import type { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: OrgCreateInput) {
    const org = await prisma.org.create({ data })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({ where: { email } })

    return org
  }

  async findManyByCity(city: string) {
    const orgs = await prisma.org.findMany({ where: { city } })

    return orgs
  }
}
