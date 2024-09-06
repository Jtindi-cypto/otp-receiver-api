// models/otp.js

const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({

    mobileNumber:{type:String , require: true},
    otp : {type : String, require: true},
    createdAt: {type: Date, default: Date.now, expires: '5m'} // code to make sure otp expires in 5m

});

module.exports = mongoose.model('OTP',otpSchema);