const Joi = require('joi');

const book=Joi.object({
      title:Joi.string().required(),
      publicationDate:Joi.date().required(),
      pages:Joi.number().required(),
      ISBN:Joi.number().required(),
      author:Joi.string().required(),
      price:Joi.string().required(),
      description:Joi.string().required(),
      
});

module.exports=book;
 
