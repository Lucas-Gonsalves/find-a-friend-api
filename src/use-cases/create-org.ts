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
  passwordHash: string
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
    passwordHash: password_hash,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const org = await this.orgsRepository.create({
      email,
      username,
      cep,
      address,
      city,
      phone,
      password_hash,
    })

    if (!org) {
      throw new OrgAlreadyExistsError()
    }

    return { org }
  }
}
