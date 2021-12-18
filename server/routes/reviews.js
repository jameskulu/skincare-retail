const router = require('express').Router()
const { verifyToken } = require('../middleware/authentication')
const {
    getReview,
    addReview,
    getItemReview,
} = require('../controllers/reviews')

router.get('/reviewed', getItemReview)

// get all reviews of an item
router.get('/:productId', getReview)

// upload item
router.post('/new', verifyToken, addReview)

module.exports = router
