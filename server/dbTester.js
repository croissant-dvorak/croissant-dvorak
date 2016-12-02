'use strict';
var db = require ('./db');

var user = {
  username: 'BSarley',
  firstName: 'Joe',
  lastName: 'Bob',
  email: 'joe.bob@facebook.com'
};

var project = {
  name: 'Big Pothole',
  geoLocation : {
    lat : 30.2672,
    long : 97.7431
  },
  address : {
    street : '801 Brazos',
    zip: 78701,
    city: 'Austin',
    state: 'Texas',
    country: 'USA'
  },
  description : String,
  owner : '5841bbd2c6f9949183d6ad55',
};

// db.postUser(user, function(err, res){
//   if (err) {
//     console.error(err);
//   }
//   console.log('post user res', res);
// });



// db.postProject(project, function(err, res){
//   if (err) {
//     console.error(err);
//   }
//   console.log('post project res', res);
// });

db.getProjects(function(err, res){
  if (err) {
    console.error(err);
  }
  console.log('get res', res);
  process.exit();
});