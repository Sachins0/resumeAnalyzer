const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");
const AppError = require('../utils/errors/app-error');

//hard-coded creds
const VALID_CREDENTIALS = {
    username: "naval.ravikant",
    password: "05111974"
};

function login(req, res)  {
    try {
        //data -> req.body
        const {username, password} = req.body;
        //validation
        if (!username || !password) {
            throw new AppError('Username and password are required', StatusCodes.BAD_REQUEST);
        }
        if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
            //gen JWT
            const token = jwt.sign(
                {username},
                process.env.JWT_SECRET,
                {expiresIn: '24h'}
            );
            //return res
            return res
                    .status(StatusCodes.OK)
                    .json({success : true, JWT: token });
        } else {
                    
        }
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json({success : false, error : error.message})
    }
};  

module.exports = {login};
