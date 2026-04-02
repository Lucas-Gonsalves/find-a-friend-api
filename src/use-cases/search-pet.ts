import type { Pet } from 'generated/prisma/client'

import type { PetsRepository } from '@/repositories/pets-repository'
import { removeUndefined } from '@/utils/remove-undefined'

interface SearchPetUseCaseRequest {
  city: string
  filters: {
    age?: number | undefined
    name?: string | undefined
    size?: 'SMALL' | 'MEDIUM' | 'LARGER' | undefined
    energyLevel?: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' | undefined
    independenceLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | undefined
    environment?: 'SMALL' | 'MEDIUM' | 'LARGER' | undefined
  }
  page: number
}

interface SearchPetUseCaseResponse {
  pets: Pet[]
}

export class SearchPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    filters,
    page,
  }: SearchPetUseCaseRequest): Promise<SearchPetUseCaseResponse> {
    const newFilters = removeUndefined({
      age: filters.age,
      name: filters.name,
      size: filters.size,
      energy_level: filters.energyLevel,
      environment: filters.environment,
      independence_level: filters.independenceLevel,
    })

    const pets = await this.petsRepository.searchMany(city, newFilters, page)

    return { pets }
  }
}
