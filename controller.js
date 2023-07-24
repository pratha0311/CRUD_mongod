const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
var usermodel = require("./model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
let jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
let refreshtokensecret = process.env.REFRESH_TOKEN_SECRET;

exports.home = (req, res) => {
  res.render("homepage");
};

exports.signuppage = (req, res) => {
  res.render("signupPage");
};
exports.signinpage = (req, res) => {
  res.render("signinPage");
};

exports.loggedin = (req, res) => {
  res.render("loggedin", { firstname: query.firstname });
};

exports.signup = async (req, res) => {
  const { firstname, lastname, phone, emailid, password, gender } = req.body;
  let hashedpass = await bcrypt.hash(password, 8);
  const userExists = await usermodel.findOne({ emailid: emailid });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const nextuser = await usermodel.find().sort({ userid: -1 }).limit(1);
  if (nextuser[0]) {
    id = nextuser[0].userid + 1;
  } else {
    id = 1;
  }
  const user = await new usermodel({
    userid: id,
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    emailid: emailid,
    password: hashedpass,
    gender: gender,
  });
  await user.save();
  res.status(201).render('signeduppage', {name:firstname, id:id});
};

exports.signin = async (req, res) => {
  const { emailid, password } = req.body;
  try {
    const userExists = await usermodel.findOne({ emailid: emailid });
    if (userExists == null) {
      return res.status(404).json({ message: "USER NOT FOUND" });
    }
    const matchpass = await bcrypt.compare(password, userExists.password);
    if (!matchpass) {
      return res.status(404).json({ message: "INVALID PASSWORD" });
    }
    const options1 = {
      expiresIn: "20m",
      issuer: "pratha",
    };
    const options2 = {
      expiresIn: "2h",
      audience: userExists.emailid,
    };
    const accesstoken = jwt.sign(
      {
        emailid: userExists.emailid,
        firstname: userExists.firstname,
        lastname: userExists.lastname,
      },
      jwtSecretKey,
      options1
    );
    const refreshToken = jwt.sign(
      {
        emailid: userExists.emailid,
        firstname: userExists.firstname,
        lastname: userExists.lastname,
      },
      refreshtokensecret,
      options2
    );
    res
      .status(200)
      .cookie("jwt", refreshToken)
      .render("loggedinPage", { name: userExists.firstname });
  } catch (err) {
    return res.send(err);
  }
};
