const mongoose = require('mongoose');

//Created object for employee schema
const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This Field is required.'
    },
    email: {
        type: String,
        required: 'This Field is required.'
    },
    mobile: {
        type: String,
        required: 'This Field is required.'
    },
    city: {
        type: String,
        required: 'This Field is required.'
    },
});

// Custom validation for email
employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Enter valid email.');

//call model function as first parameter 
mongoose.model('Employee', employeeSchema);