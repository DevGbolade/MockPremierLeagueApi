const {promisify} = require('util')
const jwt = require('jsonwebtoken');
const User = require ('../models/userModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/apiError');

const signToken = id =>{
   return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});
}

exports.singup = catchAsync( async (req, res, next) =>{
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            data: newUser  
        }
    })
});


