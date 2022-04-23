const { createOrder, getOrder, getOrders, updateOrder, deleteOrder, getIncome } = require('../controllers/order')
const { authUserAndAdmin, auth, authUserAndAuthorize } = require('../middlewares/auth')

const router = require('express').Router()

router.post('/', auth, createOrder)
router.get('/', auth, getOrders)
router.get('/find/:id', authUserAndAuthorize, getOrder)
router.put('/:id', authUserAndAuthorize, updateOrder)
router.delete('/:id', authUserAndAuthorize, deleteOrder)
router.delete('/income', authUserAndAuthorize, deleteOrder)

module.exports = router