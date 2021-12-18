const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object().keys({
        products: Joi.array()
            .items(
                Joi.object({
                    phoneNumber: Joi.string().required(),
                    address: Joi.string().required(),
                    city: Joi.string().required(),
                    country: Joi.string().required(),
                    orderedDate: Joi.date().required(),
                    quantity: Joi.number().required(),
                    totalPrice: Joi.number().required(),
                    productId: Joi.string().required(),
                })
            )
            .required(),
    })
    return schema.validate(data)
}
