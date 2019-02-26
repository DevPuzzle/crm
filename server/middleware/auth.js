const jwt = require('jsonwebtoken');
const nodemon = require('../nodemon');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
      }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, `${nodemon.env.JWT_KEY}`);
    } catch (err) {
        req.isAuth = false;
        return next();
      }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.userId = decodedToken.userId;
    req.isAuth = true;
    req.companyId = decodedToken.companyId;
    next();
};
