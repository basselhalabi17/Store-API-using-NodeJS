const express=require('express')
const router = express.Router()

const 
    {getProducts,
        createProduct,
        updateProduct,
        deleteProduct}
    = require('../controller/product')

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').patch(updateProduct).delete(deleteProduct)

module.exports = router