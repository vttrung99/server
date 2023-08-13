import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default {
    create: async function(product, product_pictures) {
        try {
            const result = await prisma.products.create({
                data: {
                    ...product,
                    product_pictures: {
                        create: product_pictures
                    },
                },
                include: {
                    product_pictures: true,
                },
            })

            return {
                status: true,
                message: "Thêm sản phẩm thành công!",
                data: result
            }
        }catch(err) {
           // console.log("err", err)
            return {
                status: false,
                message: "Lỗi model!"
            }
        }
    },
    findMany:async function () {
        try {
            let product = await prisma.products.findMany()
            return {
                status: true,
                message: "Get products ok!",
                data: product
            }
        }catch(err) {
            //console.log("err", err)
            return {
                status: false,
                message: "Get products failed!"
            } 
        }
    }
}