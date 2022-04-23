const router = require('express').Router()
const uploadImage = require('../middlewares/imgAuth')
const { authUserAndAdmin } = require('../middlewares/auth')
const uploadCtrl = require('../controllers/imgCtrl')

router.post('/upload_avatar', uploadImage, authUserAndAdmin, uploadCtrl.uploadAvatar )
router.post('/delete_avatar', authUserAndAdmin, uploadCtrl.deleteAvatar )

module.exports = router