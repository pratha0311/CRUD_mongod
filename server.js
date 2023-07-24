const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes");
const cookieparser = require("cookie-parser");
require('dotenv').config()
const port = process.env.PORT;

const app = express();
app.use(express.json());
const bp= require("body-parser")
app.use(bp.urlencoded({ extended: true }))
app.use("/", route);
app.use(cookieparser());
app.set('view engine', 'ejs');
app.path("./views");

mongoose
  .connect("mongodb://0.0.0.0:27017/userdatabase")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("err"));

try {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} catch (err) {
  console.log(err);
}
