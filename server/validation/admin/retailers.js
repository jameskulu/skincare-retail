const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object({
        companyName: Joi.string().required(),
        location: Joi.string().required(),
        email: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
        password: Joi.string().min(6).required(),
        image: Joi.allow('', null),
    })
    return schema.validate(data)
}
