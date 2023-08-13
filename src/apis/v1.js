/* Create Express Router */
import express from 'express'
const router = express.Router()

import userModule from './modules/user'
router.use('/users', userModule)

import productModule from './modules/product'
router.use('/products', productModule)

import categoryModule from './modules/category'
router.use('/categories', categoryModule)

import purchaseApi from './modules/purchase.api';
router.use('/purchase', purchaseApi)

export default router;