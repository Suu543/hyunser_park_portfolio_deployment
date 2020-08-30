const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

require("./startup/database")();
require("./startup/routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`현재 서버가 ${PORT} 에서 실행중입니다...`);
});
