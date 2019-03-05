const User = require('../mongodb/models/user');
const Project = require('../mongodb/models/project');
const Company = require('../mongodb/models/company');
const mongoose = require('mongoose');
const nodemon = require('../nodemon');
var moment = require('moment');
const nodemailer = require('nodemailer');

mongoose.connect(`mongodb+srv://${nodemon.env.MONGO_USER}:${nodemon.env.MONGO_PASSWORD}@cluster0-tivpd.mongodb.net/${nodemon.env.MONGO_DB}?retryWrites=true`).then(result => {
    console.log('connected from seed');
}).catch(err => {
    console.log(err);
});

// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-tivpd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`).then(result => {
//     console.log('connected !!!');
//     app.listen(80);
// }).catch(err => {
//     console.log(err);
// });

// async function getUSers() {
//     const users = await User.find();
//     console.log('users', users);
//     return users;
//   }

async function checkNotifications() {
    var now = moment();
    const projects = await Project.find({notification: { $exists: true }});
    // console.log('projects', projects);
     projects.forEach(async function(project) {
            const projectDate = new Date(project.notification.date);
            // project.notification.date = projectDate;

            let notificationDate = moment({
                year : projectDate.getFullYear(), 
                month :projectDate.getMonth(),
                day :projectDate.getDate(), 
                hour : project.notification.time,
                minute : 0, 
                second :0, 
                millisecond :0
            });
            // console.log(moment(now).isAfter(notificationDate));
            if ( moment(now).isAfter(notificationDate) || moment(now).isSame(notificationDate)) {
                const user = await User.findOne({company_id: project.company_id});
                const company = await Company.findOne({_id: project.company_id});
                console.log('Отправляем письмо и удалям нотификейшн', user.email, company.name);

                emailHtml = `
                    <h1>Notification for ${user.name}</h1>
                    <p>${project.notification.comment}</p>
                `;

                                // create reusable transporter object using the default SMTP transport
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'temp.socials.dp@gmail.com',
                        pass: 'daT^W4Uu'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                    });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: '<temp.socials.dp@gmail.com>', // sender address
                    to: user.email, // list of receivers
                    subject: "Notification ✔", // Subject line
                    text: "Notification for you?", // plain text body
                    html: emailHtml // html body
                };

                // send mail with defined transport object
                let info = await transporter.sendMail(mailOptions)
                
            }
    });
  }


  checkNotifications();