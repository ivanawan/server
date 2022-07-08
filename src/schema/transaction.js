const Joi = require('joi');

const transaction=Joi.object({
      totalPayment:Joi.number().required(),
      dataBook:Joi.array().required()
});

module.exports= transaction;