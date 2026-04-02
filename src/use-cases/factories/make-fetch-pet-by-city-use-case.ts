import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { FetchPetByCityUseCase } from '../fetch-pet-by-city'

export function makeFetchPetByCityUseCase() {
  const orgRepository = new PrismaOrgsRepository()
  const petRepository = new PrismaPetsRepository()
  const useCase = new FetchPetByCityUseCase(petRepository, orgRepository)

  return useCase
}
