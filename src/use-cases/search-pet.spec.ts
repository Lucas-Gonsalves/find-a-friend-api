import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { SearchPetUseCase } from './search-pet'

describe('Search Pet Use Case', () => {
  let orgRepository: InMemoryOrgsRepository
  let petRepository: InMemoryPetsRepository
  let sut: SearchPetUseCase

  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new SearchPetUseCase(petRepository)
  })

  it('should be able to search for pets', async () => {
    const org = await orgRepository.create({
      username: 'Lucas',
      email: 'lucasorg@example.com',
      password_hash: await hash('123456', 6),
      phone: '(47) 99630-7545',
      city: 'Guramirim',
      cep: '89270-000',
      address: 'Rolf passold',
    })

    await petRepository.create({
      age: 12,
      name: 'Rex',
      description: 'description',
      image: 'link-of-the-dog-image',
      org_id: org.id,
    })

    await petRepository.create({
      age: 12,
      name: 'Moon',
      description: 'description',
      image: 'link-of-the-cat-image',
      org_id: org.id,
      energy_level: 'VERY_LOW',
    })

    const { pets } = await sut.execute({
      filters: {
        energyLevel: 'VERY_LOW',
      },
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toMatchObject({ name: 'Moon' })
  })
})
