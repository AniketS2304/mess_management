const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true 
    },
    phone_no: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const User = mongoose.model('User', userSchema);
// User.save()
module.exports = User;
