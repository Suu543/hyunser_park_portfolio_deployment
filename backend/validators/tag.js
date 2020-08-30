const Joi = require("joi");

exports.tagCreateValidator = async (req, res) => {
  console.log("Validator - TagCreateValidator");

  const schema = Joi.object({
    title: Joi.string().required(),
  });

  return await schema.validateAsync(req);
};

exports.tagUpdateValidator = async (req, res) => {
  console.log("Validator - TagUpdateValidator");

  const schema = Joi.object({
    title: Joi.string().required(),
  });

  return await schema.validateAsync(req);
};
