const {getStat, updateUser, deleteUser, getUsers, getUser, updateCart, fetchCartItem, removeCartItem, handleFavorite, fetchFavorite} = require('../controllers/user')
const { authUserAndAuthorize, authUserAndAdmin, auth } = require('../middlewares/auth')

const router = require('express').Router()

router.get('/', authUserAndAdmin, getUsers)
router.get('/stat', authUserAndAdmin, getStat)
router.put('/:id', authUserAndAuthorize,updateUser)
router.delete('/:id', deleteUser)
router.get('/find/:id', authUserAndAuthorize, getUser)
router.put('/update/cart', auth, updateCart)
router.get('/get/cart', auth, fetchCartItem)
router.put('/delete/cart', auth, removeCartItem)
router.put('/update/favorite', auth, handleFavorite)
router.get('/fetch/favorite', auth, fetchFavorite)

module.exports = router