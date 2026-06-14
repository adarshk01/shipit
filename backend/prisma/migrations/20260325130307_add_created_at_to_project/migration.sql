/*
  Warnings:

  - Added the required column `createdAt` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "domainUrl" DROP NOT NULL;
