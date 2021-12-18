const { Order, Product } = require('../../models')
const { createValidation } = require('../../validation/admin/orders')

exports.all = async (req, res, next) => {
    try {
        const orders = await Order.findAll()
        return res.status(200).json({
            success: true,
            message: 'All the available orders are fetched.',
            count: orders.length,
            data: orders,
        })
    } catch (err) {
        return next(err)
    }
}

exports.single = async (req, res, next) => {
    const { orderId } = req.params

    try {
        const singleOrder = await Order.findByPk(orderId)

        if (!singleOrder)
            return res.status(404).json({
                success: false,
                message: 'Order not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single order is fetched.',
            data: singleOrder,
        })
    } catch (err) {
        return next(err)
    }
}

exports.create = async (req, res, next) => {
    const { orderedDate, quantity, totalPrice, status, productId, userId } =
        req.body

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const product = await Product.findByPk(productId)

        if (!product)
            return res.status(400).json({
                success: false,
                message: 'Product not found.',
            })

        const order = await Order.create({
            orderedDate,
            quantity,
            totalPrice,
            productId,
            userId,
            status,
        })

        return res.status(200).json({
            success: true,
            message: 'Product ordered',
            data: order,
        })
    } catch (err) {
        return next(err)
    }
}

exports.update = async (req, res, next) => {
    const { orderId } = req.params
    const { orderedDate, quantity, totalPrice, status, productId, userId } =
        req.body

    try {
        const singleOrder = await Order.findByPk(orderId)

        if (!singleOrder)
            return res.status(404).json({
                success: false,
                message: 'Order not found!',
            })

        const updatedOrder = await Order.update(
            { orderedDate, quantity, totalPrice, status, productId, userId },
            { where: { id: orderId } }
        )
        return res.status(200).json({
            success: true,
            message: 'Order was updated.',
            data: updatedOrder,
        })
    } catch (err) {
        return next(err)
    }
}

exports.remove = async (req, res, next) => {
    const { orderId } = req.params

    try {
        const singleOrder = await Order.findByPk(orderId)

        if (!singleOrder)
            return res.status(404).json({
                success: false,
                message: 'Order not found!',
            })

        const deletedOrder = await Order.destroy({
            where: { id: orderId },
        })
        return res.status(200).json({
            success: true,
            message: 'Order was deleted.',
            data: deletedOrder,
        })
    } catch (err) {
        return next(err)
    }
}
