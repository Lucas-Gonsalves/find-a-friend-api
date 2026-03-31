import type { Pet, Prisma } from 'generated/prisma/client'

export interface SearchManyQueryiesProps {
  age?: number | undefined
  name?: string | undefined
  size?: 'SMALL' | 'MEDIUM' | 'LARGER' | undefined
  energy_level?: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' | undefined
  independence_level?: 'LOW' | 'MEDIUM' | 'HIGH' | undefined
  environment?: 'SMALL' | 'MEDIUM' | 'LARGER' | undefined
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByid(id: string): Promise<Pet | null>
  findMany(): Promise<Pet[]>
  searchMany(queries: SearchManyQueryiesProps, page: number): Promise<Pet[]>
}
