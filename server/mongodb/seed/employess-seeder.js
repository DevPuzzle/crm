var Employee = require('../models/employee');
const mongoose = require('mongoose');
const nodemon = require('../../nodemon');
const company = '';
mongoose.connect(`mongodb+srv://${nodemon.env.MONGO_USER}:${nodemon.env.MONGO_PASSWORD}@cluster0-tivpd.mongodb.net/${nodemon.env.MONGO_DB}?retryWrites=true`).then(result => {
    console.log('connected from seed');
}).catch(err => {
    console.log(err);
});

var employees = [
    new Employee({
        name: 'Agatha',
        last_name: 'MacDonald',
        email: 'agatamac@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Albert',
        last_name: 'O’Connor',
        email: 'albert@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Agatha',
        last_name: 'MacDonald',
        email: 'agatamac@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Adam',
        last_name: 'Gordon',
        email: 'adam@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Bruce',
        last_name: 'Robertson',
        email: 'bruce@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Carl',
        last_name: 'Murphy',
        email: 'carl@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Douglas',
        last_name: 'Fairy',
        email: 'douglas@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Agatha',
        last_name: 'MacDonald',
        email: 'agatamac@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'James',
        last_name: 'Allford',
        email: 'james@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Louis',
        last_name: 'Sheldon',
        email: 'louis@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Roger',
        last_name: 'Gill',
        email: 'roger@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Roger',
        last_name: 'Gill',
        email: 'roger@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Vivien',
        last_name: 'Archibald',
        email: 'vivien@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Roger',
        last_name: 'Gill',
        email: 'roger@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Scott',
        last_name: 'Bush',
        email: 'scott@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Norman',
        last_name: 'Young',
        email: 'norman@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Gerald',
        last_name: 'Robin',
        email: 'gerald@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Employee({
        name: 'Frankie',
        last_name: 'Walls',
        email: 'frankie@gmail.com',
        skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
];

var done = 0;
for (var i = 0; i < employees.length; i++) {
    employees[i].save(function(err, result){
        done++;
        if (done === employees.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}

