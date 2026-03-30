import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { CreateOrgUseCase } from './create-org'

describe('Create Org', () => {
  let repository: InMemoryOrgsRepository
  let sut: CreateOrgUseCase

  beforeEach(() => {
    repository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(repository)
  })

  it('should be able to create a new org', async () => {
    const org = await sut.execute({
      username: 'Lucas',
      email: 'org@example.com',
      passwordHash: '123456',
      phone: '(47) 99630-7545',
      city: 'Guramirim',
      cep: '89270-000',
      address: 'Rolf passold',
    })

    expect(org).toBeDefined()
  })
})
