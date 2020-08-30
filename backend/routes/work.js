const express = require("express");
const router = express.Router();

const { requireSignin, adminMiddleware } = require("../controllers/auth");
const {
  list,
  create,
  read,
  remove,
  update,
  uploadS3,
  upload,
  listByReferencedCategory,
  findBySlug,
  getNineRecentWorks,
} = require("../controllers/work");

router.get("/works", list);
router.get("/work/:slug", read);
router.get("/works/recent", getNineRecentWorks);
router.get("/works/:category", listByReferencedCategory);
router.get("/works/:category/:slug", findBySlug);
router.post("/work", requireSignin, adminMiddleware, create);
router.post("/work/upload", uploadS3.single("image"), upload);
router.delete("/work/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;
