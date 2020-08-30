const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function () {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  const DB = process.env.MONGO_ATLAS;

  mongoose
    .connect(DB, options)
    .then(() => console.log(`${DB}에 연결됨...`))
    .catch((err) => console.log("DB에 연결할 수 없습니다..."));
};
