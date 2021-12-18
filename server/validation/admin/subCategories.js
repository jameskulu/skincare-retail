const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.base': `"Name" should be a type of 'text'`,
            'string.empty': `"Name" cannot be an empty field`,
            'any.required': `"Name" is a required field`,
        }),
        categoryId: Joi.string().required().messages({
            'string.base': `"Category" should be a type of 'text'`,
            'string.empty': `"Category" cannot be an empty field`,
            'any.required': `"Category" is a required field`,
        }),
    })
    return schema.validate(data)
}
