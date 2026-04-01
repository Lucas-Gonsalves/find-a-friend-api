import type { Pet } from 'generated/prisma/client'

import type { PetsRepository } from '@/repositories/pets-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetByIdUseCaseRequest {
  id: string
}

interface FetchPetByIdUseCaseResponse {
  pet: Pet
}

export class FetchPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: FetchPetByIdUseCaseRequest): Promise<FetchPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
