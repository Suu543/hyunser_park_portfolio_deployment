const express = require("express");
const {
  getContactDataFromClient,
  getContactEmail,
} = require("../controllers/contact");
const router = express.Router();

router.post("/contact", getContactDataFromClient);
router.post("/contactMail", getContactEmail);

module.exports = router;
