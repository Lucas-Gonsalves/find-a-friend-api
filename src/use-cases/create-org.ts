import { hash } from 'bcryptjs'
import type { Org } from 'generated/prisma/client'

import type { OrgsRepository } from '@/repositories/orgs-repository'

import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface CreateOrgUseCaseRequest {
  email: string
  username: string
  cep: string
  address: string
  city: string
  phone: string
  password: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    username,
    cep,
    address,
    city,
    phone,
    password,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgAlreadyExists = await this.orgsRepository.findByEmail(email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      email,
      username,
      cep,
      address,
      city,
      phone,
      password_hash,
    })

    return { org }
  }
}
