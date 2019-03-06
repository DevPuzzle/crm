const User = require('../mongodb/models/user');
const Project = require('../mongodb/models/project');
const Company = require('../mongodb/models/company');
const mongoose = require('mongoose');
const nodemon = require('../nodemon');
var moment = require('moment');
const nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
const dotenv = require('dotenv').config();

mongoose.connect(`mongodb+srv://${nodemon.env.MONGO_USER}:${nodemon.env.MONGO_PASSWORD}@cluster0-tivpd.mongodb.net/${nodemon.env.MONGO_DB}?retryWrites=true`).then(result => {
    console.log('connected from notification');
}).catch(err => {
    console.log(err);
});


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${nodemon.env.EMAIL_USER}`,
        pass: `${nodemon.env.EMAIL_PASS}`
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



async function checkNotifications() {
    var now = moment();
    const projects = await Project.find({notification: { $exists: true }});

     projects.forEach(async function(project) {
            const projectDate = new Date(project.notification.date);
            // project.notification.date = projectDate;

            let notificationDate = moment({
                year: projectDate.getFullYear(), 
                month: projectDate.getMonth(),
                day: projectDate.getDate(), 
                hour: project.notification.time,
                minute: 0, 
                second: 0, 
                millisecond: 0
            });
            // console.log(moment(now).isAfter(notificationDate));
            if ( moment(now).isAfter(notificationDate) || moment(now).isSame(notificationDate)) {
                const user = await User.findOne({company_id: project.company_id});
                const company = await Company.findOne({_id: project.company_id});

                console.log('ОТПРАВЛЯЕМ ИМЕЙЛ');
                readHTMLFile(__dirname + '/templates/notification.hbs', function(err, html) {
                    var template = handlebars.compile(html);
                    var replacements = {
                         user: user.name,
                         text: project.notification.comment,
                         project: project.title,
                         company: company.name 
                    };
                    var htmlToSend = template(replacements);
                    var mailOptions = {
                        from: `<${nodemon.env.EMAIL_USER}>`,
                        to: user.email, // list of receivers
                        subject: "Notification ✔", // Subject line
                        text: "Notification for you", // plain text body
                        html : htmlToSend
                     };
                    transporter.sendMail(mailOptions, function (error, response) {
                        if (error) {
                            console.log(error);
                            callback(error);
                        }
                    });
                });
                const updateProject = await Project.update({_id: project._id}, {$unset: {notification: true }}, function(err, res){ 
                    if(err) {
                        console.log('error updating project');
                    }
                 });
            }
    });
  }


  checkNotifications();