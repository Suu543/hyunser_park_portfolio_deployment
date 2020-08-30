const express = require("express");
const router = express.Router();

const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../validators/auth");

const validate = require("../middlewares/validate");

const {
  register,
  activateRegistration,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.post("/register", validate(userSignupValidator), register);
router.post("/register/activate", activateRegistration);
router.post("/login", validate(userSigninValidator), login);
router.put(
  "/forgot-password",
  validate(forgotPasswordValidator),
  forgotPassword
);
router.put("/reset-password", validate(resetPasswordValidator), resetPassword);

module.exports = router;
