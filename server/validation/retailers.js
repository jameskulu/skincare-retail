const Joi = require('@hapi/joi')

exports.registerValidation = (data) => {
    const schema = Joi.object({
        companyName: Joi.string().required(),
        email: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
        password: Joi.string().min(6).required(),
        location: Joi.string().required(),
    })
    return schema.validate(data)
}

exports.activateAccountValidation = (data) => {
    const schema = Joi.object({
        token: Joi.string().required(),
    })
    return schema.validate(data)
}

exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data)
}

exports.resetPasswordValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
    })
    return schema.validate(data)
}

exports.updatePasswordByTokenValidation = (data) => {
    const schema = Joi.object({
        newPassword: Joi.string().required(),
        token: Joi.string().required(),
    })
    return schema.validate(data)
}

exports.createValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.base': `"Name" should be a type of 'text'`,
            'string.empty': `"Name" cannot be an empty field`,
            'any.required': `"Name" is a required field`,
        }),
        description: Joi.string().required().messages({
            'string.base': `"Description" should be a type of 'text'`,
            'string.empty': `"Description" cannot be an empty field`,
            'any.required': `"Description" is a required field`,
        }),
        price: Joi.number().required().messages({
            'string.base': `"Price" should be a type of 'number'`,
            'string.empty': `"Price" cannot be an empty field`,
            'any.required': `"Price" is a required field`,
        }),
        subCategoryId: Joi.string().required().messages({
            'string.base': `"Sub Category" should be a type of 'text'`,
            'string.empty': `"Sub Category" cannot be an empty field`,
            'any.required': `"Sub Category" is a required field`,
        }),
        image: Joi.allow('', null),
    })
    return schema.validate(data)
}

exports.orderStatusValidation = (data) => {
    const schema = Joi.object({
        status: Joi.string()
            .valid('approved', 'refused', 'delivered')
            .required(),
    })
    return schema.validate(data)
}
