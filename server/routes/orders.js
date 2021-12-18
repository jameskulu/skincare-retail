const router = require('express').Router()
const { verifyToken, isUser } = require('../middleware/authentication')
const { create } = require('../controllers/orders')

router.post('/new', verifyToken, isUser, create)

module.exports = router
