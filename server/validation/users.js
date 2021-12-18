const Joi = require('@hapi/joi')

exports.registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
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

exports.addWishlistValidation = (data) => {
    const schema = Joi.object({
        productId: Joi.string().required().messages({
            'string.base': `"itemId" should be a type of 'text'`,
            'string.empty': `"itemId" cannot be an empty field`,
            'any.required': `"itemId" is a required field`,
        }),
    })
    return schema.validate(data)
}

exports.changePasswordValidation = (data) => {
    const schema = Joi.object({
        oldPassword: Joi.string().required().messages({
            'string.base': `"Old Password" should be a type of 'text'`,
            'string.empty': `"Old Password" cannot be an empty field`,
            'any.required': `"Old Password" is a required field`,
        }),
        newPassword: Joi.string().min(6).required().messages({
            'string.base': `"New Password" should be a type of 'text'`,
            'string.empty': `"New Password" cannot be an empty field`,
            'any.required': `"New Password" is a required field`,
        }),
    })
    return schema.validate(data)
}