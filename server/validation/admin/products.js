const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        subCategoryId: Joi.string().required(),
        retailerId: Joi.string().required(),
        image: Joi.allow('', null),
    })
    return schema.validate(data)
}
