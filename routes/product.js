const router = require('express').Router()
const {createProduct, getProduct, getProducts, updateProduct, deleteProduct} = require('../controllers/product')
const { authUserAndAdmin, authUser } = require('../middlewares/auth')

router.post('/', authUserAndAdmin, createProduct)
router.get('/', getProducts)
router.put('/:id', authUserAndAdmin, updateProduct)
router.delete('/:id', authUserAndAdmin, deleteProduct)
router.get('/find/:id', 
// authUser,
 getProduct)


module.exports = router