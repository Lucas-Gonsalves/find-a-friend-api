import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { CreateOrgUseCase } from './create-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

describe('Create Org Use Case', () => {
  let repository: InMemoryOrgsRepository
  let sut: CreateOrgUseCase

  beforeEach(() => {
    repository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(repository)
  })

  it('should be able to create a new org', async () => {
    const { org } = await sut.execute({
      username: 'Lucas',
      email: 'org@example.com',
      password: '123456',
      phone: '(47) 99630-7545',
      city: 'Guramirim',
      cep: '89270-000',
      address: 'Rolf passold',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new org using an email already exitent', async () => {
    await sut.execute({
      username: 'Lucas',
      email: 'org@example.com',
      password: '123456',
      phone: '(47) 99630-7545',
      city: 'Guramirim',
      cep: '89270-000',
      address: 'Rolf passold',
    })

    await expect(async () => {
      await sut.execute({
        username: 'Lucas',
        email: 'org@example.com',
        password: '123456',
        phone: '(47) 99630-7545',
        city: 'Guramirim',
        cep: '89270-000',
        address: 'Rolf passold',
      })
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
