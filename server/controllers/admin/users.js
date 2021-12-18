const bcrypt = require('bcryptjs')
const { User } = require('../../models')
const { createValidation } = require('../../validation/admin/users')
const cloudinary = require('../../utils/cloudinary')

exports.all = async (req, res, next) => {
    try {
        const users = await User.findAll()
        return res.status(200).json({
            success: true,
            message: 'All the available users are fetched.',
            count: users.length,
            data: users,
        })
    } catch (err) {
        return next(err)
    }
}

exports.single = async (req, res, next) => {
    const { userId } = req.params

    try {
        const singleUser = await User.findByPk(userId)

        if (!singleUser)
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single user is fetched.',
            data: singleUser,
        })
    } catch (err) {
        return next(err)
    }
}

exports.create = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        role,
        gender,
        address,
        city,
        country,
    } = req.body
    let result = null

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

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

        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path)
        }

        const createdUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            isVerified: true,
            gender,
            address,
            city,
            country,
            profilePicURL: result === null ? null : result.secure_url,
            cloudinaryId: result === null ? null : result.public_id,
        })
        return res.status(200).json({
            success: true,
            message: 'New user was added.',
            data: createdUser,
        })
    } catch (err) {
        return next(err)
    }
}

exports.update = async (req, res, next) => {
    const { userId } = req.params
    const { firstName, lastName, email, role, gender, address, city, country } =
        req.body
    let result = null

    try {
        const singleUser = await User.findByPk(userId)

        if (!singleUser)
            return res.status(404).json({
                success: false,
                message: 'User not found!',
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

        const updatedUser = await User.update(
            {
                firstName,
                lastName,
                email,
                role,
                gender,
                address,
                city,
                country,
                profilePicURL:
                    result === null
                        ? singleUser.profilePicURL
                        : result.secure_url,
                cloudinaryId:
                    result === null
                        ? singleUser.cloudinaryId
                        : result.public_id,
            },
            { where: { id: userId } }
        )
        return res.status(200).json({
            success: true,
            message: 'User was updated.',
            data: updatedUser,
        })
    } catch (err) {
        return next(err)
    }
}

exports.remove = async (req, res, next) => {
    const { userId } = req.params

    try {
        const singleUser = await User.findByPk(userId)

        if (!singleUser)
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            })

        const deletedUser = await User.destroy({
            where: { id: userId },
        })
        return res.status(200).json({
            success: true,
            message: 'User was deleted.',
            data: deletedUser,
        })
    } catch (err) {
        return next(err)
    }
}
