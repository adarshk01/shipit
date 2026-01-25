-- CreateEnum
CREATE TYPE "DeploymentStatus" AS ENUM ('Ready', 'Error', 'Building', 'Queued', 'Canceled');

-- CreateEnum
CREATE TYPE "DeploymentLogStatus" AS ENUM ('Completed', 'Error', 'Warning');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "github" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "projectId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "deploymentStatus" "DeploymentStatus" NOT NULL,
    "domainUrl" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "Deployment" (
    "deploymentId" TEXT NOT NULL,
    "deploymentStatus" "DeploymentStatus" NOT NULL,
    "commitId" TEXT NOT NULL,
    "sourcePath" TEXT NOT NULL,
    "outputPath" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Deployment_pkey" PRIMARY KEY ("deploymentId")
);

-- CreateTable
CREATE TABLE "DeploymentLog" (
    "logId" TEXT NOT NULL,
    "logMessage" TEXT NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "status" "DeploymentLogStatus" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "deploymentId" TEXT NOT NULL,

    CONSTRAINT "DeploymentLog_pkey" PRIMARY KEY ("logId")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deployment" ADD CONSTRAINT "Deployment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeploymentLog" ADD CONSTRAINT "DeploymentLog_deploymentId_fkey" FOREIGN KEY ("deploymentId") REFERENCES "Deployment"("deploymentId") ON DELETE RESTRICT ON UPDATE CASCADE;
