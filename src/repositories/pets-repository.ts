import type { Pet, Prisma } from 'generated/prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByid(id: string): Promise<Pet | null>
}
