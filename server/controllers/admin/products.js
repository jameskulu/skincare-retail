const { Product, Retailer } = require('../../models')
const { createValidation } = require('../../validation/admin/products')
const cloudinary = require('../../utils/cloudinary')

exports.all = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: Retailer,
                    as: 'retailer',
                },
            ],
        })
        return res.status(200).json({
            success: true,
            message: 'All the available products are fetched.',
            count: products.length,
            data: products,
        })
    } catch (err) {
        return next(err)
    }
}

exports.single = async (req, res, next) => {
    const { productId } = req.params

    try {
        const singleProduct = await Product.findByPk(productId, {
            include: [
                {
                    model: Retailer,
                    as: 'retailer',
                },
            ],
        })

        if (!singleProduct)
            return res.status(404).json({
                success: false,
                message: 'Product not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single product is fetched.',
            data: singleProduct,
        })
    } catch (err) {
        return next(err)
    }
}

exports.create = async (req, res, next) => {
    console.log(req.body)
    const { name, description, price, subCategoryId, retailerId } = req.body
    let result = null

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

        const createdProduct = await Product.create(
            {
                name,
                description,
                price,
                subCategoryId,
                retailerId,
                imageURL: result === null ? null : result.secure_url,
                cloudinaryId: result === null ? null : result.public_id,
            }
            // {
            //     include: [
            //         {
            //             model: Provider,
            //             as: 'provider',
            //         },
            //     ],
            // }
        )
        return res.status(200).json({
            success: true,
            message: 'New product was added.',
            data: createdProduct,
        })
    } catch (err) {
        return next(err)
    }
}

exports.update = async (req, res, next) => {
    const { productId } = req.params
    const { name, description, price, retailerId } = req.body
    let result = null

    try {
        const singleProduct = await Product.findByPk(productId)

        if (!singleProduct)
            return res.status(404).json({
                success: false,
                message: 'Product not found!',
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
                retailerId,
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

    try {
        const singleProduct = await Product.findByPk(productId)

        if (!singleProduct)
            return res.status(404).json({
                success: false,
                message: 'Product not found!',
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
