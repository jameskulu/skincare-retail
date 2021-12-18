const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
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
        role: Joi.string().valid('admin', 'user').required(),
        gender: Joi.string().valid('ma', 'fe'),
        address: Joi.string().allow('', null),
        city: Joi.string().allow('', null),
        country: Joi.string().allow('', null),
        image: Joi.allow('', null),
    })
    return schema.validate(data)
}
