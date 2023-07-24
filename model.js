const mongoose = require('mongoose')
const bcrypt =  require('bcryptjs')

const usermodel= new mongoose.Schema({
    userid: {
        type: Number,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    emailid: {
        type: String,
        lowercase:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
})

usermodel.pre('save', async function (next) {
    try{
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword
        next()
    }
    catch(err){
        console.log(err)
    }
})




module.exports = mongoose.model('authuser', usermodel)