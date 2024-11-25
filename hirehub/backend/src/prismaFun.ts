import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

//The getPrisma function for easy prisma client initialization.
export const getPrisma = (DATABASE_URL: string) => {
  const prisma = new PrismaClient({
    datasourceUrl : DATABASE_URL,
  }).$extends(withAccelerate())
  return prisma
}