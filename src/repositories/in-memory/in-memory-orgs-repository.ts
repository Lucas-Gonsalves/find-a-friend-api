import { randomUUID } from 'node:crypto'

import type { Org } from 'generated/prisma/client'
import type { OrgCreateInput } from 'generated/prisma/models'

import type { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: OrgCreateInput) {
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
