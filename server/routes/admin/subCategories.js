const router = require('express').Router()
const { verifyToken, isAdmin } = require('../../middleware/authentication')
const {
    all,
    single,
    create,
    update,
    remove,
} = require('../../controllers/admin/subCategories')

router.get('/', verifyToken, isAdmin, all)

router.get('/:subCategoryId', verifyToken, isAdmin, single)

router.post('/new', verifyToken, isAdmin, create)

router.put('/update/:subCategoryId', verifyToken, isAdmin, update)

router.delete('/delete/:subCategoryId', verifyToken, isAdmin, remove)

module.exports = router
