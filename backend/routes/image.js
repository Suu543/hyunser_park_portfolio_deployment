const express = require("express");
const router = express.Router();

const { requireSignin, adminMiddleware } = require("../controllers/auth");

// controllers
const {
  createImage,
  updateImage,
  readImages,
  remove,
} = require("../controllers/image");

router.post("/image", requireSignin, adminMiddleware, createImage);
router.put("/image/:id", requireSignin, adminMiddleware, updateImage);
router.get("/images", readImages);
router.delete("/image/:id", requireSignin, adminMiddleware, remove);

module.exports = router;
