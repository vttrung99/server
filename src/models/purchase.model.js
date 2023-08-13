import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import productModel from './product.model';
export default {
    addToCart: async function (user_id, cart_detail_record) {
        try {
            let existCart = await prisma.carts.findUnique({
                where: {
                    user_id: user_id
                }
            })
            if (existCart) {
                /* Đã có cart */
                let existProductInCart = await prisma.cart_details.findMany({
                    where: {
                        AND: [
                            {
                                product_id: cart_detail_record.product_id
                            },
                            {
                                cart_id: existCart.id
                            }
                        ]
                    }
                })
                if (existProductInCart.length != 0) {
                    /* sản phẩm đã tồn tại */
                    await prisma.cart_details.update({
                        where: {
                            id: existProductInCart[0].id
                        },
                        data: {
                            quantity: (existProductInCart[0].quantity + cart_detail_record.quantity),
                            note: (existProductInCart[0].note + "," + cart_detail_record.note)
                        }
                    })

                    return {
                        status: true,
                        message: "Add to cart thành công!"
                    }
                } else {
                    /* sản phẩm chưa tồn tại */
                    await prisma.cart_details.create({
                        data: {
                            cart_id: existCart.id,
                            ...cart_detail_record
                        }
                    })

                    return {
                        status: true,
                        message: "Add to cart thành công!"
                    }
                }
            } else {
                await prisma.carts.create({
                    data: {
                        user_id,
                        cart_details: {
                            create: [
                                cart_detail_record
                            ]
                        },
                    }
                })

                return {
                    status: true,
                    message: "Add to cart thành công!"
                }
            }

        } catch (err) {
           console.log("🚀 ~ file: purchase.model.js:75 ~ err:", err)
           
            return {
                status: false,
                message: "Lỗi model!"
            }
        }
    },
    findCart: async function (user_id) {
        try {
            let existCart = await prisma.carts.findUnique({
                where: {
                    user_id: user_id
                },
                include: {
                    cart_details: true,
                    cart_details: {
                        include: {
                            product: true,
                        }
                    }
                }
            })
            return {
                status: true,
                message: "ok!",
                data: existCart
            }
        } catch (err) {
            console.log("err", err)
            return {
                status: false,
                message: "Lỗi model!"
            }
        }
    },
}