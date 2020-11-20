const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config/.env" });
const connectDB = require("./db");

connectDB();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is up on port " + port);
});
