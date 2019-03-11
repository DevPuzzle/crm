const nodemailer = require('nodemailer');
var fs = require('fs');
const keys = require('../config/keys');

var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${keys.EMAIL_USER}`,
            pass: `${keys.EMAIL_PASS}`
        },
        tls: {
            rejectUnauthorized: false
        }
        });
    
var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

module.exports = {
    transporter: transporter,
    readHTMLFile: readHTMLFile
}



