const { Op } = require('sequelize')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cloudinary = require('../utils/cloudinary')
const {
    User,
    Order,
    Product,
    Wishlist,
    SubCategory,
    Retailer,
} = require('../models')
const { sendEmail } = require('../utils/mail')
const {
    registerValidation,
    activateAccountValidation,
    resetPasswordValidation,
    loginValidation,
    updatePasswordByTokenValidation,
    addWishlistValidation,
    changePasswordValidation,
} = require('../validation/users')

exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body

    // Validation
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })
    }

    try {
        // Checking if email exists
        const emailExists = await User.findOne({ where: { email } })

        if (emailExists)
            return res.status(400).json({
                success: false,
                message: 'Email was already taken.',
            })

        // Generating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Creating a new user
        const registeredUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            emailToken: crypto.randomBytes(64).toString('hex'),
            isVerified: false,
        })

        const subject = 'Account Activation Link'
        const html = `
            <h2>Confirm your Email Address</h2>
            <p>Hi, Thank you for signing up. Please click below to confirm your email address.</p>
            <a href="${process.env.CLIENT_URL}/customer/verify-email/${registeredUser.emailToken}">
                <button>I Confirm</button>
            </a>
            `

        // Sending verification email
        sendEmail(registeredUser.email, subject, html)
        return res.status(200).json({
            success: true,
            message:
                'Account was created successfully. Email has been sent, please activate your account.',
            data: registeredUser,
        })
    } catch (err) {
        return next(err)
    }
}

exports.activateAccount = async (req, res, next) => {
    const { token } = req.body

    // Validation
    const { error } = activateAccountValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const user = await User.findOne({ where: { emailToken: token } })

        if (!user)
            return res.status(400).json({
                success: false,
                message: 'Token is invalid.',
            })

        await User.update(
            { emailToken: null, isVerified: true },
            { where: { id: user.id } }
        )

        return res.status(200).json({
            success: true,
            message: 'Account is verified.',
            data: user,
        })
    } catch (err) {
        return next(err)
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    // Validation
    const { error } = loginValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        // Checking if user with that email exists
        const user = await User.findOne({ where: { email } })
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials.',
            })

        // Checking if password matches
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword)
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials.',
            })

        // Removing password and emailToken from object
        user.password = undefined
        user.emailToken = undefined

        // Assigning a token
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET)

        return res.status(200).json({
            success: true,
            message: 'You are now logged in.',
            token,
            data: user,
        })
    } catch (err) {
        return next(err)
    }
}

exports.resetPassword = async (req, res, next) => {
    const { email } = req.body
    const token = crypto.randomBytes(64).toString('hex')

    // Validation
    const { error } = resetPasswordValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const user = await User.findOne({ where: { email } })
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'User with that email does not exist.',
            })

        await User.update(
            {
                resetToken: token,
                expireToken: Date.now() + 3600000,
            },
            { where: { id: user.id } }
        )

        const subject = 'Password Reset'
        const html = `
            <h2>Reset your password</h2>
            <p>Please click on given link to reset your password.</p>
            <a href="${process.env.CLIENT_URL}/customer/reset-password/${token}">
                <button>Reset</button>
            </a>
            `

        // Sending forgot password email
        sendEmail(user.email, subject, html)
        return res.status(200).json({
            success: true,
            message: 'Email has been sent, please reset your password.',
        })
    } catch (err) {
        return next(err)
    }
}

exports.updatePasswordByToken = async (req, res, next) => {
    const { newPassword, token } = req.body

    // Validation
    const { error } = updatePasswordByTokenValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const user = await User.findOne({
            where: { resetToken: token, expireToken: { [Op.gt]: Date.now() } },
        })

        if (!user)
            return res.status(400).json({
                success: false,
                message: 'Session expired',
            })

        // Generating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        await User.update(
            { password: hashedPassword, resetToken: null, expireToken: null },
            { where: { id: user.id } }
        )

        return res.status(200).json({
            success: true,
            message: 'New password was updated.',
        })
    } catch (err) {
        return next(err)
    }
}

exports.validToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json(false)
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) return res.json(false)

        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        if (!verified) return res.json(false)

        const user = await User.findByPk(verified.id)
        if (!user) return res.json(false)

        return res.json(true)
    } catch (err) {
        return next(err)
    }
}

exports.loggedInUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id)
        user.password = undefined
        user.resetToken = undefined
        user.emailToken = undefined
        return res.json(user)
    } catch (err) {
        return next(err)
    }
}

exports.getOrders = async (req, res, next) => {
    const userId = req.user.id
    try {
        const orders = await Order.findAll(
            {
                include: [
                    {
                        model: Product,
                        as: 'product',
                        include: [
                            {
                                model: Retailer,
                                as: 'retailer',
                            },
                        ],
                    },
                    {
                        model: User,
                        as: 'user',
                    },
                ],
            },
            { where: { userId } }
        )
        return res.status(200).json({
            success: true,
            message: 'All the orders are fetched.',
            count: orders.length,
            data: orders,
        })
    } catch (err) {
        return next(err)
    }
}

exports.cancelOrder = async (req, res, next) => {
    const userId = req.user.id
    const { orderId } = req.params
    try {
        const productItem = await Order.findOne(
            {
                include: [
                    {
                        model: Product,
                        as: 'product',
                    },
                ],
            },
            {
                where: { id: orderId, userId },
            }
        )
        if (!productItem) {
            return res.status(400).json({
                success: false,
                message: 'Order not found',
            })
        }

        if (productItem.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'Only pending orders can be canceled',
            })
        }

        const cancelOrder = await Order.destroy({
            where: { id: productItem.id },
        })

        await Product.update(
            { isAvailable: true },
            { where: { id: productItem.product.id } }
        )

        return res.status(200).json({
            success: true,
            message: 'Order canceled.',
            data: cancelOrder,
        })
    } catch (err) {
        return next(err)
    }
}

exports.getWishlist = async (req, res, next) => {
    const userId = req.user.id
    try {
        const wishlist = await Wishlist.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                },
                {
                    model: Product,
                    as: 'product',
                    include: [
                        {
                            model: SubCategory,
                            as: 'subCategory',
                        },
                        {
                            model: Retailer,
                            as: 'retailer',
                        },
                    ],
                },
            ],
            where: { userId },
            order: [['createdAt', 'DESC']],
        })
        return res.status(200).json({
            success: true,
            message: 'All the available wishlist are fetched.',
            count: wishlist.length,
            data: wishlist,
        })
    } catch (err) {
        return next(err)
    }
}

exports.addWishlist = async (req, res, next) => {
    const { productId } = req.body
    const userId = req.user.id

    // Validation
    const { error } = addWishlistValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const product = await Product.findByPk(productId)
        if (!product)
            return res.status(400).json({
                success: false,
                message: 'Product not found',
            })

        const wishlist = await Wishlist.findOne({
            where: { userId, productId },
        })

        if (wishlist)
            return res.status(400).json({
                success: false,
                message: 'Product already added to wishlist',
            })

        const createdWishlist = await Wishlist.create({
            productId,
            userId,
        })
        return res.status(200).json({
            success: true,
            message: 'New wishlist was added.',
            data: createdWishlist,
        })
    } catch (err) {
        return next(err)
    }
}

exports.removeWishlist = async (req, res, next) => {
    const { productId } = req.params
    const userId = req.user.id

    try {
        const product = await Product.findByPk(productId)
        if (!product)
            return res.status(400).json({
                success: false,
                message: 'Product not found',
            })

        const wishlist = await Wishlist.findOne({
            where: { userId, productId },
        })
        if (!wishlist)
            return res.status(400).json({
                success: false,
                message: 'Product not included in wishlist',
            })

        const deletedWishlist = await Wishlist.destroy({
            where: { productId, userId },
        })

        return res.status(200).json({
            success: true,
            message: 'Wishlist was removed.',
            data: deletedWishlist,
        })
    } catch (err) {
        return next(err)
    }
}

exports.getProfile = async (req, res, next) => {
    const userId = req.user.id
    try {
        const user = await User.findOne({
            where: { id: userId },
        })

        if (!user)
            return res.status(400).json({
                success: false,
                message: 'User not found',
            })

        return res.status(200).json({
            success: true,
            message: 'User information is fetched.',
            data: user,
        })
    } catch (err) {
        return next(err)
    }
}

exports.editProfile = async (req, res, next) => {
    const userId = req.user.id
    let result = null
    const { firstName, lastName, gender, address, city, country } = req.body
    try {
        const user = await User.findOne({
            where: { id: userId },
        })

        if (!user)
            return res.status(400).json({
                success: false,
                message: 'User not found',
            })

        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path)
        }

        if (result !== null) {
            try {
                await cloudinary.uploader.destroy(user.cloudinaryId)
            } catch (err) {
                //
            }
        }

        const updatedUser = await user.update({
            firstName,
            lastName,
            gender,
            address,
            city,
            country,
            profilePicURL:
                result === null ? user.profilePicURL : result.secure_url,
            cloudinaryId:
                result === null ? user.cloudinaryId : result.public_id,
        })
        return res.status(200).json({
            success: true,
            message: 'User was updated.',
            data: updatedUser,
        })
    } catch (err) {
        return next(err)
    }
}

exports.changePassword = async (req, res, next) => {
    const userId = req.user.id
    const { oldPassword, newPassword } = req.body

    // Validation
    const { error } = changePasswordValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const user = await User.findOne({
            where: { id: userId },
        })

        if (!user)
            return res.status(400).json({
                success: false,
                message: 'User not found',
            })

        const isPassword = await bcrypt.compare(oldPassword, user.password)
        if (!isPassword)
            return res.status(400).json({
                success: false,
                message: 'Your old password did not match.',
            })

        // Generating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        const updatedUser = await user.update({
            password: hashedPassword,
        })

        return res.status(200).json({
            success: true,
            message: 'User was updated.',
            data: updatedUser,
        })
    } catch (err) {
        return next(err)
    }
}
