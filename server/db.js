var mongoose = require('mongoose');


// ----- EXPORTS -----
module.exports = {

}

// ----- SETUP DB -----
var mongoURI = 'mongodb://'+require('./config.js').username+':'+require('./config.js').pw+'@ds119718.mlab.com:19718/croissant-dvorak';
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb connection open');
});

// ----- MODEL INFO -----
var projectSchema = mongoose.Schema({
  //Proj_id: int()  generated by mongo
  name: String,
  geo_location : {
    lat : Number,
    long : Number
  },
  address : {
    street : String,
    street2 : String,
    zip: Number,
    city: String,
    state: String,
    country: String
  },
  description : String,
  owner : mongoose.Schema.ObjectId,
  start_date : Date,
  comp_date : Date,
  picture: String // url to host?
});

var Project = mongoose.model('Project', projectSchema);

var feedbackSchema = mongoose.Schema({
  user_id: mongoose.Schema.ObjectId,
  proj_id: mongoose.Schema.ObjectId,
  text_data: String,
  date: Date
})

var Feedback = mongoose.model('Feedback', feedbackSchema);

var userSchema = mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String
})

var User = mongoose.model('User', userSchema);

var sessionSchema = mongoose.Schema({
  session_id: String,
  user_id: mongoose.Schema.ObjectId
})

var Session = mongoose.model('Session', sessionSchema);


// ----- METHODS -----