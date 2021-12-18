const router = require('express').Router()
const { verifyToken, isAdmin } = require('../../middleware/authentication')

const {
    all,
    single,
    create,
    update,
    remove,
} = require('../../controllers/admin/orders')

router.get('/', verifyToken, isAdmin, all)

router.get('/:orderId', verifyToken, isAdmin, single)

router.post('/new', verifyToken, isAdmin, create)

router.put('/update/:orderId', verifyToken, isAdmin, update)

router.delete('/delete/:orderId', verifyToken, isAdmin, remove)

module.exports = router
