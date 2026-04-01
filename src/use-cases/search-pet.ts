import type { Pet } from 'generated/prisma/client'

import type { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetUseCaseRequest {
  queries: {
    age?: number
    name?: string
    size?: 'SMALL' | 'MEDIUM' | 'LARGER'
    energyLevel?: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
    independenceLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
    environment?: 'SMALL' | 'MEDIUM' | 'LARGER'
  }

  page: number
}

interface SearchPetUseCaseResponse {
  pets: Pet[]
}

export class SearchPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ queries, page }: SearchPetUseCaseRequest): Promise<SearchPetUseCaseResponse> {
    const newQueries = {
      age: queries.age,
      name: queries.name,
      size: queries.size,
      energy_level: queries.energyLevel,
      environment: queries.environment,
      independence_level: queries.independenceLevel,
    }

    const pets = await this.petsRepository.searchMany(newQueries, page)

    return { pets }
  }
}
