const jwt = require('jsonwebtoken')
const { User, Retailer } = require('../models')

exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(401).json({
            success: false,
            message: 'Missing Authorization Header',
        })
    const token = req.headers.authorization.split(' ')[1]
    if (!token)
        return res.status(401).json({
            success: false,
            message: 'No authentication token, authorization denied',
        })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        return next()
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Token',
        })
    }
}

exports.isUserVerified = async (req, res, next) => {
    if (!req.body.email) return next()
    try {
        const user = await User.findOne({
            where: { email: req.body.email },
        })
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials',
            })
        if (user.isVerified) return next()
        return res.status(400).json({
            success: false,
            message:
                'Your account has not been verified. Please check your email to verify your account.',
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

exports.isRetailerVerified = async (req, res, next) => {
    if (!req.body.email) return next()
    try {
        const retailer = await Retailer.findOne({
            where: { email: req.body.email },
        })
        if (!retailer)
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials',
            })
        if (retailer.isVerified) return next()
        return res.status(400).json({
            success: false,
            message:
                'Your account has not been verified. Please check your email to verify your account.',
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.user.id)
    if (user && user.role === 'admin') return next()
    return res.status(401).json({ success: false, message: 'Access Denied' })
}

exports.isRetailer = async (req, res, next) => {
    const retailer = await Retailer.findByPk(req.user.id)
    if (retailer) return next()
    return res
        .status(401)
        .json({ success: false, message: 'Only retailer can access.' })
}

exports.isUser = async (req, res, next) => {
    const user = await User.findByPk(req.user.id)
    if (user) return next()
    return res
        .status(401)
        .json({ success: false, message: 'Only user can access.' })
}
