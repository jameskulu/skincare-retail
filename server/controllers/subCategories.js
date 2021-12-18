const { SubCategory } = require('../models')

exports.all = async (req, res, next) => {
    try {
        const subCategory = await SubCategory.findAll({
            order: [['createdAt', 'DESC']],
        })
        return res.status(200).json({
            success: true,
            message: 'All the available sub categories are fetched.',
            count: subCategory.length,
            data: subCategory,
        })
    } catch (err) {
        return next(err)
    }
}

exports.single = async (req, res, next) => {
    const { subCategoryId } = req.params

    try {
        const singleSubCategory = await SubCategory.findByPk(subCategoryId)

        if (!singleSubCategory)
            return res.status(404).json({
                success: false,
                message: 'Sub Category not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single sub category is fetched.',
            data: singleSubCategory,
        })
    } catch (err) {
        return next(err)
    }
}
