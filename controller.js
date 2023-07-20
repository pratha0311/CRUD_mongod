const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");

exports.home = (req, res) => {
  res.render("homepage.ejs");
};

exports.signuppage = (req, res) => {
    res.render("signupPage");
};
