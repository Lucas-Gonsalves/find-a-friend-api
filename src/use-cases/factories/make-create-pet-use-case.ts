import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const petRepository = new PrismaPetsRepository()
  const useCase = new CreatePetUseCase(petRepository)

  return useCase
}
