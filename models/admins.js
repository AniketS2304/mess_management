const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    
    name:{
        type: String,
    },
    adminname: {
        type: String,
        required: true,
        unique: true,   
        trim: true      
    },
    email: {
        type: String,
        required: true,
        unique: true,   
        trim: true,     
        lowercase: true 
    },
    password: {
        type: String,
        required: true,
        password : admin123
    },
    role: {
        type: String,
        default: 'admin' 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now 
    }
}, {
    timestamps: true 
});

adminSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
