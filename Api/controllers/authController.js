const {promisify} = require('util')
const jwt = require('jsonwebtoken');
const User = require ('../models/userModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

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

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    // 1) check if email and password exist 
    if(!email || !password){
        return next(new AppError('please provide email and password', 400));
    }
    console.log(email, password)
    //2) check if user exist and the password is correct
    const user = await User.findOne({email}).select('+password');

    if(!user || !( await user.correctPassword(password, user.password))){
        return next(new AppError('Invalid email or password', 401))
    }
    
    //3) if everything ok, send token to the client
    const token = signToken(user._id);
    res.status(200).json({
        status: 'succes',
        token
    })

});

exports.protect = catchAsync(async (req, res, next) =>{
    // 1) Get the token and check if its there
    let token; 
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
     ){
        token = req.headers.authorization.split(' ')[1];

    }
    // console.log(token);
    if(!token){
        next(new AppError('You are not logged in please login to get access', 401))
    }

    // 2) Verification of token 
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY)
 

    // 3) Check if user still exists
    const freshUser = await User.findById(decoded.id);
    if(!freshUser){
        return next(new AppError('the user belonging to this token does no longer exist. ', 401))
    }

    // 4) Check if user changed password after the token was issued 
    if (  freshUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError('You recently changed your password please log in again', 401));
    
    }

    req.user = freshUser;
 
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {  
              
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this action', 403));
        }
    next();

    }
}


