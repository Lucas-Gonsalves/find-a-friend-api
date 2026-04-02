import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { SearchPetUseCase } from '../search-pet'

export function makeSearchPetUseCase() {
  const petRepository = new PrismaPetsRepository()
  const useCase = new SearchPetUseCase(petRepository)

  return useCase
}
