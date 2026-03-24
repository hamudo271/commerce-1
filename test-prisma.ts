
import { PrismaClient } from '@prisma/client'
async function main() {
  const prisma = new PrismaClient()
  try {
    const users = await prisma.user.findMany()
    console.log('Success:', users.length, 'users found')
  } catch (e) {
    console.error('Failure:', e)
  } finally {
    await prisma.$disconnect()
  }
}
main()
