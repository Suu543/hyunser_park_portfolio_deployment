const express = require("express");
const router = express.Router();
const { list, create, update, remove } = require("../controllers/tag");

const { tagCreateValidator, tagUpdateValidator } = require("../validators/tag");
const validate = require("../middlewares/validate");

const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.get("/tags", list);
router.post(
  "/tag",
  validate(tagCreateValidator),
  requireSignin,
  adminMiddleware,
  create
);
router.put(
  "/tag/:slug",
  validate(tagUpdateValidator),
  requireSignin,
  adminMiddleware,
  update
);
router.delete("/tag/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;
