import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { FetchPetByIdUseCase } from './fetch-pet-by-id'

describe('Fetch Pet By Id Use Case', () => {
  let orgRepository: InMemoryOrgsRepository
  let petRepository: InMemoryPetsRepository
  let sut: FetchPetByIdUseCase

  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new FetchPetByIdUseCase(petRepository)
  })

  it('should be able to fetch a pet by id', async () => {
    const firstOrg = await orgRepository.create({
      username: 'Lucas',
      email: 'lucasorg@example.com',
      password_hash: await hash('123456', 6),
      phone: '(47) 99630-7545',
      city: 'Guramirim',
      cep: '89270-000',
      address: 'Rolf passold',
    })

    const petCreated = await petRepository.create({
      age: 12,
      name: 'Rex',
      description: 'description',
      image: 'link-of-the-dog-image',
      org_id: firstOrg.id,
    })

    const { pet } = await sut.execute({ id: petCreated.id })

    expect(pet).toMatchObject({ id: petCreated.id })
  })
})
