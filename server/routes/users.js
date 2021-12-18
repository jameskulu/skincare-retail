const router = require('express').Router()
const {
    verifyToken,
    isUser,
    isUserVerified,
} = require('../middleware/authentication')
const upload = require('../utils/multer')
const {
    register,
    activateAccount,
    login,
    resetPassword,
    updatePasswordByToken,
    validToken,
    loggedInUser,
    getOrders,
    cancelOrder,
    getWishlist,
    addWishlist,
    removeWishlist,
    getProfile,
    editProfile,
    changePassword,
} = require('../controllers/users')

// User registration
router.post('/register', register)

// Email activation
router.post('/email-activate', activateAccount)

// User login
router.post('/login', isUserVerified, login)

// Forgot password
router.post('/reset-password', isUserVerified, resetPassword)

// Change password from forgot password
router.post('/new-password', updatePasswordByToken)

// Verify Token
router.post('/tokenIsValid', validToken)

// get logged in user
router.get('/', verifyToken, loggedInUser)

// get all orders of loggedIn user
router.get('/orders', verifyToken, isUser, getOrders)

// Cancel order
router.delete('/orders/:orderId/cancel', verifyToken, isUser, cancelOrder)

// get all wishlist of logged in user
router.get('/wishlist', verifyToken, isUser, getWishlist)

// add to wishlist
router.post('/wishlist/add', verifyToken, isUser, addWishlist)

// remove from wishlist
router.delete(
    '/wishlist/remove/:productId',
    verifyToken,
    isUser,
    removeWishlist
)

// get logged in user
router.get('/profile', verifyToken, isUser, getProfile)

router.put(
    '/profile/edit',
    verifyToken,
    isUser,
    upload.single('image'),
    editProfile
)

router.put('/profile/change-password', verifyToken, isUser, changePassword)

module.exports = router
