import express from 'express';
const router = express.Router();

import categoryController from '../../controllers/category.controller';

router.get('/',categoryController.findMany)

module.exports = router;