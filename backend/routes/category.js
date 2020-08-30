const express = require("express");
const router = express.Router();

const { requireSignin, adminMiddleware } = require("../controllers/auth");

// controllers
const {
  list,
  singleCategory,
  create,
  update,
  remove,
} = require("../controllers/category");

// routes
router.post("/category", requireSignin, adminMiddleware, create);
router.put("/category/:slug", requireSignin, adminMiddleware, update);
router.delete("/category/:slug", requireSignin, adminMiddleware, remove);
router.get("/category/:slug", singleCategory);
router.get("/categories", list);

module.exports = router;
