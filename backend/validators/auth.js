const Joi = require("joi");

exports.userSignupValidator = async (req, res) => {
  console.log("Validator - UserSignupValidation");

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(5).max(255).required(),
  });

  return await schema.validateAsync(req);
};

exports.userSigninValidator = async (req, res) => {
  console.log("Validator - UserSigninValidator");

  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().required(),
  });

  return await schema.validateAsync(req);
};

exports.forgotPasswordValidator = async (req, res) => {
  console.log("Validator - ForgotPasswordValidator");

  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
  });

  return await schema.validateAsync(req);
};

exports.resetPasswordValidator = async (req, res) => {
  console.log("Validator - ResetPasswordValidator");

  const schema = Joi.object({
    newPassword: Joi.string().min(3).max(255).required(),
    resetPasswordLink: Joi.string().required(),
  });

  return await schema.validateAsync(req);
};
