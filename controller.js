const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
var usermodel = require("./model")
const bcrypt =  require('bcryptjs')

exports.home = (req, res) => {
  res.render("homepage");
};

exports.signuppage = (req, res) => {
    res.render("signupPage");
};

exports.loggedin = (req,res) =>{
  res.render("loggedin" , {name: query.name});
}

exports.signup = async(req,res) =>{
  const {firstname, lastname, phone, emailid, password, gender } = req.body;
  let hashedpass = await bcrypt.hash(password, 8);
  const userExists= await usermodel.findOne({"emailid" : emailid});
        if(userExists){
            return res.status(400).json({message: "User already exists"})
         }
  const nextuser = await usermodel.find().sort({userid : -1}).limit(1)
  if(nextuser[0]){
    id = nextuser[0].userid+1;}
  else{
    id=1;
  }
  const user= await new usermodel({
            userid: id,
            firstname: firstname,
            lastname: lastname,
            phone:phone,
            emailid: emailid,
            password: hashedpass,
            gender:gender
        })
        await user.save()
        res.status(201).json({message:"USER SAVED!!",userid:id,})
}