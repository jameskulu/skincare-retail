const { Op } = require('sequelize')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
    Retailer,
    Product,
    Order,
    SubCategory,
    User,
    ProductReview,
} = require('../models')
const { sendEmail } = require('../utils/mail')
const cloudinary = require('../utils/cloudinary')
const {
    registerValidation,
    activateAccountValidation,
    resetPasswordValidation,
    loginValidation,
    updatePasswordByTokenValidation,
    orderStatusValidation,
    createValidation,
} = require('../validation/retailers')

exports.register = async (req, res, next) => {
    const { companyName, email, password, location } = req.body

    // Validation
    const { error } = registerValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        // Checking if email exists
        const emailExists = await Retailer.findOne({ where: { email } })

        if (emailExists)
            return res.status(400).json({
                success: false,
                message: 'Email already exists',
            })

        // Generating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Creating a new user
        const registeredRetailer = await Retailer.create({
            companyName,
            email,
            password: hashedPassword,
            location,
            emailToken: crypto.randomBytes(64).toString('hex'),
            isVerified: false,
        })

        const subject = 'Account Activation Link'
        const html = `
            <h2>Confirm your Email Address</h2>
            <p>Hi, Thank you for signing up. Please click below to confirm your email address.</p>
            <a href="${process.env.CLIENT_URL}/retailer/verify-email/${registeredRetailer.emailToken}">
                <button>I Confirm</button>
            </a>
            `

        // Sending verification email
        sendEmail(registeredRetailer.email, subject, html)

        return res.status(200).json({
            success: true,
            message:
                'Account was created successfully. Email has been sent, please activate your account.',
            data: registeredRetailer,
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
        const retailer = await Retailer.findOne({
            where: { emailToken: token },
        })

        if (!retailer)
            return res.status(400).json({
                success: false,
                message: 'Token is invalid.',
            })

        await Retailer.update(
            { emailToken: null, isVerified: true },
            { where: { id: retailer.id } }
        )

        return res.status(200).json({
            success: true,
            message: 'Account is verified.',
            data: retailer,
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
        // Checking if provider with that email exists
        const retailer = await Retailer.findOne({ where: { email } })
        if (!retailer)
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials.',
            })

        // Checking if password matches
        const isPassword = await bcrypt.compare(password, retailer.password)
        if (!isPassword)
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials.',
            })

        // Removing password and emailToken from object
        retailer.password = undefined
        retailer.emailToken = undefined

        // Assigning a token
        const token = jwt.sign({ id: retailer.id }, process.env.TOKEN_SECRET)

        return res.status(200).json({
            success: true,
            message: 'You are now logged in.',
            token,
            data: retailer,
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
        const retailer = await Retailer.findOne({ where: { email } })
        if (!retailer)
            return res.status(200).json({
                success: true,
                message: 'Email has been sent, please reset your password.',
            })

        await Retailer.update(
            {
                resetToken: token,
                expireToken: Date.now() + 3600000,
            },
            { where: { id: retailer.id } }
        )

        const subject = 'Password Reset'
        const html = `
            <h2>Reset your password</h2>
            <p>Please click on given link to reset your password.</p>
            <a href="${process.env.CLIENT_URL}/retailer/reset-password/${token}">
                <button>Reset</button>
            </a>
            `

        // Sending forgot password email
        sendEmail(retailer.email, subject, html)
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
        const retailer = await Retailer.findOne({
            where: { resetToken: token, expireToken: { [Op.gt]: Date.now() } },
        })

        if (!retailer)
            return res.status(400).json({
                success: false,
                message: 'Session expired',
            })

        // Generating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        await Retailer.update(
            { password: hashedPassword, resetToken: null, expireToken: null },
            { where: { id: retailer.id } }
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

        const retailer = await Retailer.findByPk(verified.id)
        if (!retailer) return res.json(false)

        return res.json(true)
    } catch (err) {
        return next(err)
    }
}

exports.loggedInRetailer = async (req, res, next) => {
    try {
        const retailer = await Retailer.findByPk(req.user.id)
        retailer.password = undefined
        retailer.resetToken = undefined
        retailer.emailToken = undefined
        return res.json(retailer)
    } catch (err) {
        return next(err)
    }
}

exports.getOrders = async (req, res, next) => {
    const retailerId = req.user.id
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: Product,
                    as: 'product',
                    where: { retailerId },
                },
                {
                    model: User,
                    as: 'user',
                },
            ],
        })
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

exports.changeOrderStatus = async (req, res, next) => {
    const { orderId } = req.params
    const { status } = req.body
    const retailerId = req.user.id

    // Validation
    const { error } = orderStatusValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const order = await Order.findByPk(orderId, {
            include: [
                {
                    model: Product,
                    as: 'product',
                },
                {
                    model: User,
                    as: 'user',
                },
            ],
        })

        if (!order)
            return res
                .status(404)
                .json({ success: false, message: 'Order not found' })

        if (order.product.retailerId !== retailerId)
            return res.status(401).json({
                success: false,
                message: 'Access denied !',
            })

        if (status === 'approved') {
            await order.update({ status })
        } else if (status === 'pending') {
            await order.update({ status })
        } else if (status === 'refused') {
            await order.update({ status })
        } else if (status === 'delivered') {
            await order.update({ status })

            // Item reviewed
            const itemReview = await ProductReview.findOne({
                where: { productId: order.product.id, userId: order.user.id },
            })

            if (!itemReview) {
                await ProductReview.create({
                    userId: order.user.id,
                    isReviewed: false,
                    productId: order.product.id,
                })
            }
        }

        return res.status(200).json({
            success: true,
            message: `Order ${status}.`,
            data: order,
        })
    } catch (err) {
        return next(err)
    }
}

exports.getUploadedProducts = async (req, res, next) => {
    const retailerId = req.user.id

    try {
        const products = await Product.findAll({
            where: { retailerId },
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Retailer,
                    as: 'retailer',
                },
                {
                    model: SubCategory,
                    as: 'subCategory',
                },
            ],
        })
        return res.status(200).json({
            success: true,
            message: 'All the uploaded products are fetched.',
            count: products.length,
            data: products,
        })
    } catch (err) {
        return next(err)
    }
}

exports.create = async (req, res, next) => {
    const { name, description, price, subCategoryId } = req.body
    let result = null
    const retailerId = req.user.id

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path)
        }

        const createdProduct = await Product.create({
            name,
            description,
            price,
            subCategoryId,
            retailerId,
            imageURL: result === null ? null : result.secure_url,
            cloudinaryId: result === null ? null : result.public_id,
        })

        const product = await Product.findOne({
            where: { id: createdProduct.id },
            include: [
                {
                    model: Retailer,
                    as: 'retailer',
                },
            ],
        })

        return res.status(200).json({
            success: true,
            message: 'New product was added.',
            data: product,
        })
    } catch (err) {
        return next(err)
    }
}

exports.update = async (req, res, next) => {
    const { productId } = req.params
    const retailerId = req.user.id
    const { name, description, price, categoryId } = req.body
    let result = null

    try {
        const singleProduct = await Product.findByPk(productId)

        if (!singleProduct)
            return res.status(404).json({
                success: false,
                message: 'Product not found!',
            })

        if (singleProduct.retailerId !== retailerId)
            return res.status(401).json({
                success: false,
                message:
                    'Access denied ! Only creator of this product can update.',
            })

        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path)
        }

        if (result !== null) {
            try {
                await cloudinary.uploader.destroy(singleProduct.cloudinaryId)
            } catch (err) {
                //
            }
        }

        const updatedProduct = await Product.update(
            {
                name,
                description,
                price,
                categoryId,
                productId,
                imageURL:
                    result === null
                        ? singleProduct.imageURL
                        : result.secure_url,
                cloudinaryId:
                    result === null
                        ? singleProduct.cloudinaryId
                        : result.public_id,
            },
            { where: { id: productId } }
        )
        return res.status(200).json({
            success: true,
            message: 'Product was updated.',
            data: updatedProduct,
        })
    } catch (err) {
        return next(err)
    }
}

exports.remove = async (req, res, next) => {
    const { productId } = req.params
    const retailerId = req.user.id

    try {
        const singleProduct = await Product.findByPk(productId)

        if (!singleProduct)
            return res.status(404).json({
                success: false,
                message: 'Product not found!',
            })

        if (singleProduct.retailerId !== retailerId)
            return res.status(401).json({
                success: false,
                message:
                    'Access denied ! Only creator of this product can delete.',
            })

        const deletedProduct = await Product.destroy({
            where: { id: productId },
        })
        return res.status(200).json({
            success: true,
            message: 'Product was deleted.',
            data: deletedProduct,
        })
    } catch (err) {
        return next(err)
    }
}
