const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config/.env" });
const connectDB = require("./db");

connectDB();
port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is up on port " + port);
});
