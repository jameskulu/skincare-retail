const { SubCategory, Category } = require('../../models')
const { createValidation } = require('../../validation/admin/subCategories')

exports.all = async (req, res, next) => {
    try {
        const subCategory = await SubCategory.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Category,
                    as: 'category',
                },
            ],
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
        const singleSubCategory = await SubCategory.findOne({
            where: {
                id: subCategoryId,
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                },
            ],
        })

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

exports.create = async (req, res, next) => {
    const { name, categoryId } = req.body

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const createdSubCategory = await SubCategory.create({
            name,
            categoryId,
        })
        return res.status(200).json({
            success: true,
            message: 'New sub category was added.',
            data: createdSubCategory,
        })
    } catch (err) {
        return next(err)
    }
}

exports.update = async (req, res, next) => {
    const { subCategoryId } = req.params
    const { name, categoryId } = req.body

    try {
        const singleSubCategory = await SubCategory.findByPk(subCategoryId)

        if (!singleSubCategory)
            return res.status(404).json({
                success: false,
                message: 'Sub Category not found!',
            })

        await singleSubCategory.update({ name, categoryId })
        return res.status(200).json({
            success: true,
            message: 'Sub Category was updated.',
            data: singleSubCategory,
        })
    } catch (err) {
        return next(err)
    }
}

exports.remove = async (req, res, next) => {
    const { subCategoryId } = req.params

    try {
        const singleSubCategory = await SubCategory.findByPk(subCategoryId)

        if (!singleSubCategory)
            return res.status(404).json({
                success: false,
                message: 'Sub Category not found!',
            })

        const deletedSubCategory = await SubCategory.destroy({
            where: { id: subCategoryId },
        })

        return res.status(200).json({
            success: true,
            message: 'Sub Category was deleted.',
            data: deletedSubCategory,
        })
    } catch (err) {
        return next(err)
    }
}
