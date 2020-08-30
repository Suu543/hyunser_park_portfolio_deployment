// Models
const { User } = require("../models/user");

// Email
const {
  registerEmailParams,
  forgotPasswordEmailParams,
} = require("../helpers/email");

const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

exports.register = async (req, res) => {
  console.log("Auth - Registration");
  const { name, email, password } = req.body;

  try {
    // 1. DB에 요청으로 들어온 이메일 존재여부 조회
    let newUser = await User.findOne({ email });
    if (newUser)
      return res.status(400).json({ error: "Already Registered Email" });

    // 2. 요청으로 들어온 값과 Secret Key를 이용해 토큰 생성
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "10m",
      }
    );

    // 3. 이메일 전송
    const params = registerEmailParams(email, token);
    const sendEmailOnRegister = AWS_SES.sendEmail(params).promise();

    sendEmailOnRegister
      .then((data) => {
        console.log("Email Submitted to SES", data);
        return res.status(200).json({
          message: `Email has been sent to ${email}, Follow the instructions to complete your registration`,
        });
      })
      .catch((error) => {
        console.log("SES Email on Register", error);
        return res.status(400).json({
          message: `We could not verify your email. Please try again...`,
        });
      });
  } catch (error) {
    console.log("Register Error", error);
    return res.status(400).send(error);
  }
};

exports.activateRegistration = (req, res) => {
  console.log("Auth - ActivateRegistration");
  const { token } = req.body;

  jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, async function (
    err,
    decoded
  ) {
    if (err) return res.status(401).json({ error: "Expired Link..." });

    const { name, email, password } = decoded;

    try {
      let user = await User.findOne({ email });
      if (user)
        return res
          .status(401)
          .json({ error: "Email has already been taken..." });

      user = new User({ name, email, password });
      user.salt = await user.makeSalt();
      user.hashed_password = await user.encryptPassword(password);
      await user.save();
      return res.status(200).json({
        message: "Registration Success. Please Login...",
      });
    } catch (error) {
      console.log("ActivateRegistration Error", error);
      return res.status(401).json({
        error: "Error Saving User in Database. Try Again or Later",
      });
    }
  });
};

exports.login = async (req, res) => {
  console.log("Auth - Login");

  if (!(req.body.email && req.body.password))
    return res.status(400).json({ error: "email or password is not provided" });

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).json({ error: "Unregistered Account..." });

    const validPassword = await user.authenticate(req.body.password);
    if (!validPassword)
      return res.status(400).json({
        error: "Invalid Password or Email",
      });

    const { _id, name, email, role } = user;
    const token = user.generateAuthToken();

    // res.cookie("token", token, { expiresIn: "1d" });
    return res.status(200).json({
      token,
      user: { _id, name, email, role },
    });
  } catch (error) {
    console.log("Login Error", error);
    return res.status(400).send(error);
  }
};

exports.requireSignin = (req, res, next) => {
  console.log("Auth - RequireSignin");

  let token = req.headers.authorization.replace("Bearer ", "");

  if (!token)
    return res.status(401).send("Not Valid Token... Please Login Again...");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

exports.authMiddleware = async (req, res, next) => {
  console.log("Auth - AuthMiddleware");

  try {
    const user = await User.findById({
      _id: req.user._id,
    });

    if (!user) return res.status(400).json({ error: "Not Found User" });

    req.profile = user;
    next();
  } catch (error) {
    console.log("AuthMiddleware Error", error);
    return res.status(400).send(error);
  }
};

exports.adminMiddleware = async (req, res, next) => {
  console.log("Auth - AdminMiddleware");

  try {
    const user = await User.findById({ _id: req.user._id });

    if (!user) return res.status(404).json({ error: "Not Found User" });
    if (user.role !== "admin")
      return res
        .status(403)
        .json({ error: "Access Denied... Admin Property..." });

    req.profile = user;
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.forgotPassword = async (req, res) => {
  console.log("Auth - ForgotPassword");

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ error: "User with that email does not exist" });

    const token = jwt.sign(
      { name: user.name },
      process.env.JWT_RESET_PASSWORD,
      { expiresIn: "10m" }
    );

    const params = forgotPasswordEmailParams(email, token);

    await user.updateOne({ resetPasswordLink: token });

    const sendResetPasswordEmail = AWS_SES.sendEmail(params).promise();

    sendResetPasswordEmail
      .then((data) => {
        console.log("SES Reset Password Success", data);
        return res.status(200).json({
          message: `Email has been sent to ${email}. Click on the link to reset your password`,
        });
      })
      .catch((error) => {
        console.log("ses reset password failed", error);
        return res.status(200).json({
          message: "We could not verify your email. Try Again!",
        });
      });
  } catch (error) {
    return res.status(400).json({
      error: `${error} Password Reset Failed... Try Again!`,
    });
  }
};

exports.resetPassword = (req, res) => {
  console.log("Auth - ResetPassword");

  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink)
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      async function (err, decoded) {
        try {
          if (err)
            return res
              .status(401)
              .json({ error: "Invalid Token... Please Try Again..." });

          const user = await User.findOne({ resetPasswordLink });
          if (!user) return res.status(400).json({ error: "Not Found User" });

          user.salt = await user.makeSalt();
          user.hashed_password = await user.encryptPassword(newPassword);
          user.resetPassword = "";
          await user.save();

          return res.status(200).json({
            message: "Successfully Changed Password! Please Login Again...",
          });
        } catch (error) {
          return res.status(400).json({
            error: "Password Reset Failed... Try Again...",
          });
        }
      }
    );
};
