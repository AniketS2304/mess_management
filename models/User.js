const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true ,
        unique : true,
        trim: true
    },
    phone_no: {
        type: String, 
        required: true,
        required: true ,
        unique : true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt :{
        type : Date,
        default : Date.now()
    }
    },
    {
        timestamps : true
    }

);


const User = mongoose.model('User', userSchema);
// User.save()
module.exports = User;
