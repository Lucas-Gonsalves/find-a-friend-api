import { randomUUID } from 'node:crypto'

import type { Org } from 'generated/prisma/client'
import type { OrgCreateInput } from 'generated/prisma/models'

import type { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: OrgCreateInput) {
    const orgAlreadyExists = this.items.find((org) => org.email === data.email)

    if (orgAlreadyExists) {
      return null
    }

    const org: Org = {
      id: randomUUID(),
      email: data.email,
      username: data.username,
      cep: data.cep,
      address: data.address,
      city: data.city,
      phone: data.phone,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}
