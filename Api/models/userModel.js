const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require: [true, 'Please tell us your name!'],
        minlength: [3, 'A name must not be shorter than 3 characters'],
        maxlength: [20, 'A name must not be longer than 20 characters']

    },
    email: {
        type: String,
        require:[true, 'A user must have an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],


    },
    
    role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
    password:{
        type: String,
        require: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        require: [true, 'Please confirm your password'],
        validate: {
        validator: function (el) {
            return el === this.password;

        },
        message: 'Passwords are not the same!'

       }

    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },

    passwordChangedAt: Date
   
});


userSchema.pre('save', async function(next){
    // Only run this function if password was actually modified
    if(!this.isModified('password')) return next();
    // Hash the password with the cost of 12
    this.password  = await bcrypt.hash(this.password, 12);
    // Delete the passwordConfirm
    this.passwordConfirm =undefined;
    next();

});

const User = mongoose.model('User', userSchema);

module.exports = User;