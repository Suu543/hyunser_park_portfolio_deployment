// schema.validate({});
// -> { value: {}, error: '"username" is required' }

module.exports = (validator) => {
    return async (req, res, next) => {
      console.log("validate middleware req", req);
      try {
        await validator(req.body);
        next();
      } catch (error) {
        console.log("validate middleware error", error);
        return res.status(422).json({ error: error.details[0].message });
      }
    };
  };
  