import type { Prisma } from 'generated/prisma/client'
import type { PetUncheckedCreateInput } from 'generated/prisma/models'

import { prisma } from '@/lib/prisma'
import { removeUndefined } from '@/utils/remove-undefined'

import type { PetsRepository, SearchManyQueryiesProps } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } })

    return pet
  }

  async searchMany(city: string, queries: SearchManyQueryiesProps, page: number) {
    const { name, ...filters } = queries

    const where: Prisma.PetWhereInput = {
      ...removeUndefined({
        ...filters,
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
      }),
      org: {
        is: {
          city: {
            equals: city,
            mode: 'insensitive',
          },
        },
      },
    }

    const pets = await prisma.pet.findMany({
      where,
      orderBy: {
        created_at: 'asc',
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return pets
  }

  async findMany() {
    const pets = await prisma.pet.findMany()

    return pets
  }
}
