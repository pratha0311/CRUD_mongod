const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')

exports.home = (req,res) =>{
    res.send("This is home page")
}