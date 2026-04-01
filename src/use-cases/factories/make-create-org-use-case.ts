import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

import { CreateOrgUseCase } from '../create-org'

export function makeCreateOrgUseCase() {
  const orgRepository = new PrismaOrgsRepository()
  const useCase = new CreateOrgUseCase(orgRepository)

  return useCase
}
