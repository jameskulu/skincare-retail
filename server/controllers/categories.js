const { Category, SubCategory, Product } = require('../models')

exports.all = async (req, res, next) => {
    try {
        const category = await Category.findAll({
            order: [['createdAt', 'DESC']],
        })
        return res.status(200).json({
            success: true,
            message: 'All the available categories are fetched.',
            count: category.length,
            data: category,
        })
    } catch (err) {
        return next(err)
    }
}

exports.single = async (req, res, next) => {
    const { categoryId } = req.params

    try {
        const singleCategory = await Category.findOne({
            where: { id: categoryId },
            include: [
                {
                    model: SubCategory,
                    as: 'subCategory',
                },
            ],
        })

        if (!singleCategory)
            return res.status(404).json({
                success: false,
                message: 'Category not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single category is fetched.',
            data: singleCategory,
        })
    } catch (err) {
        return next(err)
    }
}

exports.singleByName = async (req, res, next) => {
    const { categoryName } = req.params

    try {
        const singleCategory = await Category.findOne({
            where: { name: categoryName },
            include: [
                {
                    model: SubCategory,
                    as: 'subCategory',
                },
            ],
        })

        if (!singleCategory)
            return res.status(404).json({
                success: false,
                message: 'Category not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single category is fetched.',
            data: singleCategory,
        })
    } catch (err) {
        return next(err)
    }
}

exports.itemsByCategory = async (req, res, next) => {
    const { categoryName } = req.params
    try {
        const category = await Category.findOne({
            where: { name: categoryName },
        })

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found!',
            })
        }

        const products = await Product.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: SubCategory,
                    as: 'subCategory',
                    required: true,
                    include: [
                        {
                            model: Category,
                            as: 'category',
                            where: { name: categoryName },
                        },
                    ],
                },
            ],
        })
        return res.status(200).json({
            success: true,
            message: `Products of ${category} category is fetched.`,
            data: products,
        })
    } catch (err) {
        return next(err)
    }
}
