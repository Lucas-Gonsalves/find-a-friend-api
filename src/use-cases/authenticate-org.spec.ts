import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { AuthenticateOrgUseCase } from './authenticate-org'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Org', () => {
  let repository: InMemoryOrgsRepository
  let sut: AuthenticateOrgUseCase

  beforeEach(() => {
    repository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(repository)
  })

  it('should be able to authenticate', async () => {
    await repository.create({
      username: 'Lucas',
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      phone: '(47) 99630-7545',
      city: 'Guramirim',
      cep: '89270-000',
      address: 'Rolf passold',
    })

    const { org } = await sut.execute({
      email: 'org@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong credentials', async () => {
    await repository.create({
      username: 'Lucas',
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      phone: '(47) 99630-7545',
      city: 'Guramirim',
      cep: '89270-000',
      address: 'Rolf passold',
    })

    await expect(async () => {
      await sut.execute({
        email: 'org@example.com',
        password: 'wrong password',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
