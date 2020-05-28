const Joi = require('@hapi/joi')

const validateReg = (data) => {
    const schema = Joi.object({
        username: Joi
            .string()
            .min(3)
            .max(15)
            .required()
            .regex(/[a-zA-Z._]*/),
        email: Joi
            .string()
            .required()
            .email(),
        password: Joi
            .string()
            .min(6)
            .required()
    })
    return schema.validate(data)
}

const validateLog = (data) => {
    const schema = Joi.object({
        username: Joi
            .string()
            .min(3)
            .max(15)
            .required()
            .regex(/[a-zA-Z._]*/),
        password: Joi
            .string()
            .min(6)
            .required()
    })
    return schema.validate(data)
}

module.exports.validateReg = validateReg
module.exports.validateLog = validateLog