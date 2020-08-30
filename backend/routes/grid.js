const express = require("express");
const router = express.Router();

const { requireSignin, adminMiddleware } = require("../controllers/auth");

// controllers
const {
  createGridImage,
  updateGridImage,
  readGridImages,
  removeGridImage,
} = require("../controllers/grid");

router.post("/grid", requireSignin, adminMiddleware, createGridImage);
router.put("/grid/:id", requireSignin, adminMiddleware, updateGridImage);
router.get("/grids", readGridImages);
router.delete("/grid/:id", requireSignin, adminMiddleware, removeGridImage);

module.exports = router;
