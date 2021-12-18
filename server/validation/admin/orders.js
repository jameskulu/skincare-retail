const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object({
        orderedDate: Joi.date().required(),
        quantity: Joi.number().required(),
        totalPrice: Joi.number().required(),
        status: Joi.string()
            .valid('pending', 'delivered', 'approved', 'refused')
            .required(),
        productId: Joi.string().required(),
        userId: Joi.string().required(),
    })
    return schema.validate(data)
}
