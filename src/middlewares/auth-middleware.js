const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");
const AppError = require('../utils/errors/app-error');

function aunthicatetoken(req, res, next) {
   try {
     //extract token
     const token = req.header('Authorization')?.replace('Bearer', '')?.trim();
     if(!token){
      throw new AppError('Token is missing', StatusCodes.UNAUTHORIZED);
     };
     //verify token
     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
         throw new AppError('Invalid token', StatusCodes.UNAUTHORIZED);
        }
        req.user = user;
        next();
     });
   } catch (error) {
    console.log("error at auth middleware", error);
    return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({success : false, error : error.message})
   }
};

module.exports = {aunthicatetoken};