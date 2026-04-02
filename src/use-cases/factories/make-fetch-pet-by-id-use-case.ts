import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { FetchPetByIdUseCase } from '../fetch-pet-by-id'

export function makeFetchPetByIdUseCase() {
  const petRepository = new PrismaPetsRepository()
  const useCase = new FetchPetByIdUseCase(petRepository)

  return useCase
}
