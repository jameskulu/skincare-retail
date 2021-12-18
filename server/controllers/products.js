const { Op } = require('sequelize')
const { Product, Retailer, SubCategory } = require('../models')

exports.search = async (req, res) => {
    const { q } = req.query
    try {
        const searchedProducts = await Product.findAll({
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
            where: {
                name: {
                    [Op.like]: `%${q}%`,
                },
            },
        })

        res.status(200).json({
            success: true,
            message: 'Products searched successfully',
            data: searchedProducts,
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

exports.all = async (req, res, next) => {
    try {
        const products = await Product.findAll({
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
                {
                    model: SubCategory,
                    as: 'subCategory',
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
