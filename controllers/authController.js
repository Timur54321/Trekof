const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN + 'd'
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.signup = async (req, res) => {
    console.log(req.body);
    const newUser = await User.create(req.body);

    createSendToken(newUser, 201, res);
};

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: "failed",
            message: "Email or password was not provided!"
        });
    }

    const user = await User.findOne({email}).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            status: 'failed',
            message: 'Login or passowrd is incorrect'
        });
    }

    createSendToken(user, 200, res);
};

exports.logout = (req, res) => {
    
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000 ),
        httpOnly: true
    });
    res.status(200).json({status: 'success'});
};

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) 
    {
        return res.status(401).json({
            status: "failed",
            error: "You are not logged in!"
        });
    }

    let decoded;
    try {
        decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            status: 'failed',
            message: 'jwt malformed'
        });
    }

    const freshUser = await User.findById(decoded.id);
    
    if (!freshUser)
    {
        return res.status(401).json({
            status: 'failed',
            message: 'user belonging to this token does not exist lmaooo!'
        });
    }

    req.user = freshUser;
    next();
}

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            const freshUser = await User.findById(decoded.id);
            
            if (!freshUser) return next();
            
            res.locals.user = freshUser;
            
            return next();
        } catch (err) {
            return next();
        }
    }
    
    next();
}
