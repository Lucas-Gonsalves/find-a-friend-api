import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

import { AuthenticateOrgUseCase } from '../authenticate-org'

export function makeAuthenticateUseCase() {
  const orgRepository = new PrismaOrgsRepository()
  const useCase = new AuthenticateOrgUseCase(orgRepository)

  return useCase
}
