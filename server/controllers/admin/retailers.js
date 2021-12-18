const bcrypt = require('bcryptjs')
const { Retailer } = require('../../models')
const { createValidation } = require('../../validation/admin/retailers')
const cloudinary = require('../../utils/cloudinary')

exports.all = async (req, res, next) => {
    try {
        const retailers = await Retailer.findAll()
        return res.status(200).json({
            success: true,
            message: 'All the available retailers are fetched.',
            count: retailers.length,
            data: retailers,
        })
    } catch (err) {
        return next(err)
    }
}

exports.single = async (req, res, next) => {
    const { retailerId } = req.params

    try {
        const singleRetailer = await Retailer.findByPk(retailerId)

        if (!singleRetailer)
            return res.status(404).json({
                success: false,
                message: 'Retailer not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single retailer is fetched.',
            data: singleRetailer,
        })
    } catch (err) {
        return next(err)
    }
}

exports.create = async (req, res, next) => {
    const { companyName, location, email, password } = req.body
    let result = null
    console.log(req.body)

    // Validation
    const { error } = createValidation(req.body)
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
                message: 'Email was already taken.',
            })

        // Generating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path)
        }

        const createdRetailer = await Retailer.create({
            companyName,
            location,
            email,
            password: hashedPassword,
            isVerified: true,
            profilePicURL: result === null ? null : result.secure_url,
            cloudinaryId: result === null ? null : result.public_id,
        })
        return res.status(200).json({
            success: true,
            message: 'New retailer was added.',
            data: createdRetailer,
        })
    } catch (err) {
        return next(err)
    }
}

exports.update = async (req, res, next) => {
    const { retailerId } = req.params
    const { companyName, location, email } = req.body
    let result = null

    try {
        const singleRetailer = await Retailer.findByPk(retailerId)

        if (!singleRetailer)
            return res.status(404).json({
                success: false,
                message: 'Retailer not found!',
            })

        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path)
        }

        if (result !== null) {
            try {
                await cloudinary.uploader.destroy(singleRetailer.cloudinaryId)
            } catch (err) {
                //
            }
        }

        const updatedRetailer = await Retailer.update(
            {
                companyName,
                location,
                email,
                profilePicURL:
                    result === null
                        ? singleRetailer.profilePicURL
                        : result.secure_url,
                cloudinaryId:
                    result === null
                        ? singleRetailer.cloudinaryId
                        : result.public_id,
            },
            { where: { id: retailerId } }
        )
        return res.status(200).json({
            success: true,
            message: 'Retailer was updated.',
            data: updatedRetailer,
        })
    } catch (err) {
        return next(err)
    }
}

exports.remove = async (req, res, next) => {
    const { retailerId } = req.params

    try {
        const singleRetailer = await Retailer.findByPk(retailerId)

        if (!singleRetailer)
            return res.status(404).json({
                success: false,
                message: 'Retailer not found!',
            })

        const deletedRetailer = await Retailer.destroy({
            where: { id: retailerId },
        })
        return res.status(200).json({
            success: true,
            message: 'Retailer was deleted.',
            data: deletedRetailer,
        })
    } catch (err) {
        return next(err)
    }
}
