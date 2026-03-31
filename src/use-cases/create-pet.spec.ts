import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { CreatePetUseCase } from './create-pet'

describe('Create Pet Use Case', () => {
  let orgRepository: InMemoryOrgsRepository
  let petRepository: InMemoryPetsRepository
  let sut: CreatePetUseCase

  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petRepository)
  })

  it('should be able to create a new pet', async () => {
    const org = await orgRepository.create({
      username: 'Lucas',
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      phone: '(47) 99630-7545',
      city: 'Guramirim',
      cep: '89270-000',
      address: 'Rolf passold',
    })

    const { pet } = await sut.execute({
      age: 12,
      name: 'Rex',
      description: 'description',
      image: 'link-of-the-dog-image',
      orgId: org.id,
      size: 'MEDIUM',
      energyLevel: 'LOW',
      independenceLevel: 'MEDIUM',
      environment: 'SMALL',
      adoptionRequirement: ['It need a lot of love', 'It need aways to stay with you'],
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
