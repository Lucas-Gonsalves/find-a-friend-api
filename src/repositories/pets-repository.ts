import type { Pet, Prisma } from 'generated/prisma/client'

export interface SearchManyQueryiesProps {
  age?: number
  name?: string
  size?: 'SMALL' | 'MEDIUM' | 'LARGER'
  energy_level?: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  independence_level?: 'LOW' | 'MEDIUM' | 'HIGH'
  environment?: 'SMALL' | 'MEDIUM' | 'LARGER'
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findMany(): Promise<Pet[]>
  searchMany(city: string, queries: SearchManyQueryiesProps, page: number): Promise<Pet[]>
}
