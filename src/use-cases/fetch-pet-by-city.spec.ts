import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { FetchPetByCityUseCase } from './fetch-pet-by-city'

describe('Fetch Pet By City Use Case', () => {
  let orgRepository: InMemoryOrgsRepository
  let petRepository: InMemoryPetsRepository
  let sut: FetchPetByCityUseCase

  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new FetchPetByCityUseCase(petRepository, orgRepository)
  })

  it('should be able to fetch pets by city', async () => {
    const firstOrg = await orgRepository.create({
      username: 'Lucas',
      email: 'lucasorg@example.com',
      password_hash: await hash('123456', 6),
      phone: '(47) 99630-7545',
      city: 'Guramirim',
      cep: '89270-000',
      address: 'Rolf passold',
    })

    const secondOrg = await orgRepository.create({
      username: 'Gabriel',
      email: 'gabrielorg@example.com',
      password_hash: await hash('123456', 6),
      phone: '(47) 99630-7545',
      city: 'Jaragua do sul',
      cep: '89270-000',
      address: 'Rolf passold',
    })

    await petRepository.create({
      age: 12,
      name: 'Rex',
      description: 'description',
      image: 'link-of-the-dog-image',
      org_id: firstOrg.id,
    })

    await petRepository.create({
      age: 5,
      name: 'Moon',
      description: 'description',
      image: 'link-of-the-cat-image',
      org_id: secondOrg.id,
    })

    const { pets } = await sut.execute({ city: 'Guramirim' })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toMatchObject({ name: 'Rex' })
  })
})
