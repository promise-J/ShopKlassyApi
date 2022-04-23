const router = require('express').Router()
const userCtrl = require('../controllers/auth')
const {auth} = require('../middlewares/auth')

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/info', auth, userCtrl.getUserInfo)
router.get('/logout', userCtrl.logout)


module.exports = router