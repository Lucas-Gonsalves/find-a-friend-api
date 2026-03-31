import { randomUUID } from 'node:crypto'

import type { Pet, Prisma } from 'generated/prisma/client'

import type { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findByid(id: string) {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findMany() {
    const pets = this.items

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const adoption_requirement = Array.isArray(data.adoption_requirement)
      ? data.adoption_requirement
      : (data.adoption_requirement?.set ?? [])

    const pet = {
      id: randomUUID(),
      age: data.age,
      name: data.name,
      description: data.description,
      image: data.image,
      org_id: data.org_id,
      energy_level: data.energy_level ?? 'MEDIUM',
      environment: data.environment ?? 'MEDIUM',
      independence_level: data.independence_level ?? 'MEDIUM',
      size: data.size ?? 'MEDIUM',
      adoption_requirement: adoption_requirement,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
