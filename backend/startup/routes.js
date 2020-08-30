const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const authRoutes = require("../routes/auth");
const categoryRoutes = require("../routes/category");
const tagRoutes = require("../routes/tag");
const workRoutes = require("../routes/work");
const imageRoutes = require("../routes/image");
const gridRoutes = require("../routes/grid");
const contactRoutes = require("../routes/contact");

module.exports = function (app) {
  app.use(express.json({ limit: "5mb", type: "application/json" }));
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan("dev"));
  app.use(cors());
  app.use(helmet());

  if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
  }

  app.use("/api", authRoutes);
  app.use("/api", categoryRoutes);
  app.use("/api", tagRoutes);
  app.use("/api", workRoutes);
  app.use("/api", imageRoutes);
  app.use("/api", gridRoutes);
  app.use("/api", contactRoutes);
};
