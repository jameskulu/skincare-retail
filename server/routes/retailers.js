const router = require('express').Router()
const {
    verifyToken,
    isRetailerVerified,
    isRetailer,
} = require('../middleware/authentication')
const multer = require('../middleware/multer')
const {
    register,
    activateAccount,
    login,
    resetPassword,
    updatePasswordByToken,
    validToken,
    loggedInRetailer,
    getOrders,
    changeOrderStatus,
    getUploadedProducts,
    create,
    update,
    remove,
} = require('../controllers/retailers')

// Retailer registration
router.post('/register', register)

// Email activation
router.post('/email-activate', activateAccount)

// Retailer login
router.post('/login', isRetailerVerified, login)

// Forgot password
router.post('/reset-password', isRetailerVerified, resetPassword)

// Change password from forgot password
router.post('/new-password', updatePasswordByToken)

// Verify Token
router.post('/tokenIsValid', validToken)

// get logged in user
router.get('/', verifyToken, loggedInRetailer)

// get all orders of loggedIn retailer
router.get('/orders', verifyToken, isRetailer, getOrders)

// approve/refuse orders
router.post(
    '/orders/:orderId/status',
    verifyToken,
    isRetailer,
    changeOrderStatus
)

// get all uploaded products
router.get('/products', verifyToken, getUploadedProducts)

router.post(
    '/products/new',
    verifyToken,
    isRetailer,
    multer.single('image'),
    create
)

router.put(
    '/products/update/:productId',
    verifyToken,
    isRetailer,
    multer.single('image'),
    update
)

router.delete('/products/delete/:productId', verifyToken, isRetailer, remove)

module.exports = router
