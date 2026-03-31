import type { Pet } from 'generated/prisma/client'

import type { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseRequest {
  age: number
  name: string
  description: string
  image: string
  orgId: string
  size?: 'SMALL' | 'MEDIUM' | 'LARGER'
  energyLevel?: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  independenceLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
  environment?: 'SMALL' | 'MEDIUM' | 'LARGER'
  adoptionRequirement?: string[]
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private PetsRepository: PetsRepository) {}

  async execute({
    age,
    name,
    description,
    image,
    orgId,
    size,
    energyLevel,
    independenceLevel,
    environment,
    adoptionRequirement,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.PetsRepository.create({
      age,
      name,
      description,
      image,
      org_id: orgId,
      size: size ?? 'MEDIUM',
      energy_level: energyLevel ?? 'MEDIUM',
      independence_level: independenceLevel ?? 'MEDIUM',
      environment: environment ?? 'MEDIUM',
      adoption_requirement: adoptionRequirement ?? [''],
    })

    return { pet }
  }
}
