// index.js
const express = require('express');
const mongoose = require('mongoose');
const OTP = require('./models/otp');  // OTP model
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/otpDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// API endpoint to receive OTP
app.post('/receive-otp', async (req, res) => {
    const { mobileNumber, otp } = req.body;

    if (!mobileNumber || !otp) {
        return res.status(400).json({ message: 'Mobile number and OTP are required.' });
    }

    try {
        // Save OTP to database
        const newOtp = new OTP({ mobileNumber, otp });
        await newOtp.save();

        res.status(200).json({ message: 'OTP received successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving OTP', error });
    }
});

//Start the Server.

const PORT = 3000;
app.listen(PORT, ()=> {

    console.log('Server is running on port ${PORT}');

});