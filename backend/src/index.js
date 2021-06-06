const express = require("express");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config({ path: "./config/.env" });
const connectDB = require("./db");

connectDB();
const userRoute = require("./routes/user");
const travelRoute = require("./routes/travel");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(cors());

app.use(userRoute);
app.use(travelRoute);

const port = 3000
app.listen(port, () => {
  console.log("server is up on port " + port);
});
