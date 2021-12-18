const { Product, User, Review, ProductReview } = require('../models')
const { addReviewValidation } = require('../validation/reviews')

exports.getItemReview = async (req, res, next) => {
    try {
        const reviews = await ProductReview.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                },
                {
                    model: Product,
                    as: 'product',
                },
            ],
            order: [['createdAt', 'DESC']],
        })
        return res.status(200).json({
            success: true,
            message: 'All the available product reviews are fetched.',
            count: reviews.length,
            data: reviews,
        })
    } catch (err) {
        return next(err)
    }
}

exports.getReview = async (req, res, next) => {
    const { productId } = req.params
    try {
        const reviews = await Review.findAll({
            where: { productId },
            include: [
                {
                    model: User,
                    as: 'user',
                },
                {
                    model: Product,
                    as: 'product',
                },
            ],
            order: [['createdAt', 'DESC']],
        })
        return res.status(200).json({
            success: true,
            message: 'All the available reviews are fetched.',
            count: reviews.length,
            data: reviews,
        })
    } catch (err) {
        return next(err)
    }
}

exports.addReview = async (req, res, next) => {
    const { text, rating, productId } = req.body
    const userId = req.user.id

    // Validation
    const { error } = addReviewValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const productReview = await ProductReview.findOne({
            where: { productId, userId, isReviewed: false },
        })

        if (!productReview) {
            return res.status(404).json({
                success: false,
                message: 'You cannot review on this item!',
            })
        }

        const createdReview = await Review.create({
            text,
            rating,
            productId,
            userId,
        })

        await ProductReview.update(
            { isReviewed: true },
            { where: { productId, userId } }
        )

        return res.status(200).json({
            success: true,
            message: 'New review was added.',
            data: createdReview,
        })
    } catch (err) {
        return next(err)
    }
}
