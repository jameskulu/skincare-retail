const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        categoryId: Joi.string().required(),
    })
    return schema.validate(data)
}
