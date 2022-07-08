const Joi = require('joi');

const register=Joi.object({
      fullName:Joi.string().required(),
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
      password:Joi.string().min(8).required()
});

const login=Joi.object({
    email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
     password: Joi.string().min(8).required(),
});

module.exports={register,login}
