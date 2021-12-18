const router = require('express').Router()
const { verifyToken, isAdmin } = require('../../middleware/authentication')
const multer = require('../../middleware/multer')
const {
    all,
    single,
    create,
    update,
    remove,
} = require('../../controllers/admin/products')

router.get('/', verifyToken, isAdmin, all)

router.get('/:productId', verifyToken, isAdmin, single)

router.post('/new', verifyToken, isAdmin, multer.single('image'), create)

router.put(
    '/update/:productId',
    verifyToken,
    isAdmin,
    multer.single('image'),
    update
)

router.delete('/delete/:productId', verifyToken, isAdmin, remove)

module.exports = router
