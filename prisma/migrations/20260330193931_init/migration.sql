-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGER');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('SMALL', 'MEDIUM', 'LARGER');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "size" "Size" NOT NULL DEFAULT 'MEDIUM',
    "energy_level" "EnergyLevel" NOT NULL DEFAULT 'MEDIUM',
    "independence_level" "IndependenceLevel" NOT NULL DEFAULT 'MEDIUM',
    "environment" "Environment" NOT NULL DEFAULT 'MEDIUM',
    "image" TEXT NOT NULL,
    "adoption_requirement" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
