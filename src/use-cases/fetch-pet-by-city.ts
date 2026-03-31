import type { Pet } from 'generated/prisma/client'

import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { PetsRepository } from '@/repositories/pets-repository'

interface FetchPetByCityUseCaseRequest {
  city: string
}

interface FetchPetByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetByCityUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({ city }: FetchPetByCityUseCaseRequest): Promise<FetchPetByCityUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyByCity(city)

    const orgIds = orgs.map((org) => org.id)

    const pets = await this.petsRepository.findMany()

    const petsFiltered = pets.filter((pet) => orgIds.includes(pet.org_id))

    return { pets: petsFiltered }
  }
}
