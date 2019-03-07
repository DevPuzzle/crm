const User = require('../mongodb/models/user');
const Project = require('../mongodb/models/project');
const Company = require('../mongodb/models/company');
const Notification = require('../mongodb/models/notification-type');
const mongoose = require('mongoose');
var moment = require('moment');
var handlebars = require('handlebars');
var mailer = require('./mailer');
const keys = require('../config/keys');

console.log('${process.env.MONGO_USER}', `${keys.MONGO_USER}`);
mongoose.connect(`mongodb+srv://${keys.MONGO_USER}:${keys.MONGO_PASSWORD}@cluster0-tivpd.mongodb.net/${keys.MONGO_DB}?retryWrites=true`).then(result => {
    console.log('connected from notification');
}).catch(err => {
    console.log(err);
});

async function checkNotifications() {
    var now = moment();
    const projects = await Project.find({notification: { $exists: true }});

     projects.forEach(async function(project) {
            const projectDate = new Date(project.notification.date);

            let notificationDate = moment({
                year: projectDate.getFullYear(), 
                month: projectDate.getMonth(),
                day: projectDate.getDate(), 
                hour: project.notification.time,
                minute: 0, 
                second: 0, 
                millisecond: 0
            });

            if ( moment(now).isAfter(notificationDate) || moment(now).isSame(notificationDate)) {
                const user = await User.findOne({company_id: project.company_id});
                const company = await Company.findOne({_id: project.company_id});
                const notificationType = await Notification.findById(project.notification.type);

                if(notificationType.name === 'email') {                
                    console.log('send email');
                    mailer.readHTMLFile(__dirname + '/templates/notification.hbs', function(err, html) {
                        var template = handlebars.compile(html);
                        var replacements = {
                            user: user.name,
                            text: project.notification.comment,
                            project: project.title,
                            company: company.name 
                        };
                        var htmlToSend = template(replacements);
                        var mailOptions = {
                            from: `<${keys.EMAIL_USER}>`,
                            to: user.email,
                            subject: "Notification ✔",
                            text: "Notification for you",
                            html : htmlToSend
                        };
                        mailer.transporter.sendMail(mailOptions, function (error, response) {
                            if (error) {
                                console.log(error);
                                callback(error);
                            }
                        });
                    });
                } 
                if (notificationType.name === 'phone') {
                    console.log('send sms');
                }
                const updateProject = await Project.update({_id: project._id}, {$unset: {notification: true }}, function(err, res){ 
                    exit();
                    if(err) {
                        console.log('error updating project');
                    }
                 });    
            }
    });
  }

  checkNotifications();
  function exit() {
    mongoose.disconnect();
}
  