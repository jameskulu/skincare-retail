const router = require('express').Router()
const { verifyToken, isAdmin } = require('../../middleware/authentication')
const {
    all,
    single,
    create,
    update,
    remove,
} = require('../../controllers/admin/categories')

router.get('/', verifyToken, isAdmin, all)

router.get('/:categoryId', verifyToken, isAdmin, single)

router.post('/new', verifyToken, isAdmin, create)

router.put('/update/:categoryId', verifyToken, isAdmin, update)

router.delete('/delete/:categoryId', verifyToken, isAdmin, remove)

module.exports = router
