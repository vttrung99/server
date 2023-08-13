import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default {
    findMany: async function () {
        try {
            let categories = await prisma.categories.findMany()
            return {
                status: true,
                message: "Get categories success!",
                data: categories
            }
        }catch(err) {
            return {
                status: false,
                message: "Get categories failed!"
            } 
        }
    }
}