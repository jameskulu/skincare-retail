const router = require('express').Router()
const { all, single } = require('../controllers/subCategories')

router.get('/', all)

router.get('/:subCategoryId', single)

module.exports = router
