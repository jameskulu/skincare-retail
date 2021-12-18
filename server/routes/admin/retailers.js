const router = require('express').Router()
const { verifyToken, isAdmin } = require('../../middleware/authentication')
const {
    all,
    single,
    create,
    update,
    remove,
} = require('../../controllers/admin/retailers')
const multer = require('../../middleware/multer')

router.get('/', verifyToken, isAdmin, all)

router.get('/:retailerId', verifyToken, isAdmin, single)

router.post('/new', verifyToken, isAdmin, multer.single('image'), create)

router.put(
    '/update/:retailerId',
    verifyToken,
    isAdmin,
    multer.single('image'),
    update
)

router.delete('/delete/:retailerId', verifyToken, isAdmin, remove)

module.exports = router
