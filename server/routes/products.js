const router = require('express').Router()
const { search, all, single } = require('../controllers/products')

router.get('/s', search)

router.get('/', all)

router.get('/:productId', single)

module.exports = router
