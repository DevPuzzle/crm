const Company = require('../mongodb/models/company');
const User = require('../mongodb/models/user');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const {checkAuth} = require('../helpers/helpers');
const nodemon = require('../nodemon');

async function getAuthorizedUser (args, req) {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return next();
    }
    if(!req.isAuth) {
        const error = new Error('Not Authenticated!');
        error.status = 401;
        console.log(error);
        throw error;
    }

    
    const token = authHeader.split(' ')[1];
    let decodedToken;
    
    try {
        decodedToken = jwt.verify(token, `${nodemon.env.JWT_KEY}`);
    } catch (err) {
        return next();
      }
    if (!decodedToken) {
        return next();
    }
    const company = await Company.findById({ _id: decodedToken.companyId });
    const user = await User.findById({ _id: decodedToken.userId });
    const AuthorizedUser = {
        _id: decodedToken.userId,
        name: user.name,
        email: decodedToken.email,
        company_id: decodedToken.companyId,
        company_name: company.name
    }
    
    return AuthorizedUser;
}

async function getUserById ( { _id }) {
    const user = await User.findOne({ _id: _id });
	    if (!user) {
	      const error = new Error('User not found');
	      throw error;
	    }
	    return user;  
}

module.exports = {
    getAuthorizedUser: getAuthorizedUser,
    getUserById: getUserById
}