const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const {
  getContactDataAndSendToMe,
  getContactEmail,
} = require("../helpers/email");

dotenv.config();

const SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

exports.getContactDataFromClient = (req, res) => {
  console.log("Contact - GetContactDataFromClient");
  const { name, email, message } = req.body;

  const params = getContactDataAndSendToMe(name, email, message);
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
};

exports.getContactEmail = (req, res) => {
  console.log("Contact - GetContactDataFromClient");
  const { email } = req.body;

  const params = getContactEmail(email);
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
};
