const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
    })
    return schema.validate(data)
}
