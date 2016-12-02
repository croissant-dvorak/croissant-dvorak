'use strict';
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// ----- EXPORTS -----
module.exports = {
  getProjects : getProjects,
  getProjectById : getProjectById,
  postProject : postProject,
  getUsers : getUsers,
  getUserById : getUserById,
  postUser : postUser,
  getSessionById : getSessionById,
  postSession : postSession,
  getFeedbackByProjectId : getFeedbackByProjectId,
  getFeedbackByUserId : getFeedbackByUserId,
  postFeedback : postFeedback
};

// ----- SETUP DB -----
var mongoURI = 'mongodb://'+require('./config.js').mlObj.username+':'+require('./config.js').mlObj.pw+'@ds119718.mlab.com:19718/croissant-dvorak';
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb connection open');
});

// ----- MODEL INFO -----

var models = {};

var projectSchema = mongoose.Schema({
  //Proj_id: int()  generated by mongo
  name: String,
  geoLocation : {
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
  startDate : Date,
  compDate : Date,
  picture: String // url to host?
});

models.Project = mongoose.model('Project', projectSchema);

var feedbackSchema = mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  projectId: mongoose.Schema.ObjectId,
  textData: String,
  date: Date
});

models.Feedback = mongoose.model('Feedback', feedbackSchema);

var userSchema = mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String
});

models.User = mongoose.model('User', userSchema);

var sessionSchema = mongoose.Schema({
  sessionId: String,
  userId: mongoose.Schema.ObjectId
});

models.Session = mongoose.model('Session', sessionSchema);


// --------- METHODS ---------
// ----- PROJECT METHODS -----

function getProjects(cb){
  models.Project.find()
    .then(function(res){
      console.log('projects' , res);
      cb(null, res);
  })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}

function getProjectById(projectId, cb){
  models.Project.findOne({_id: projectId})
    .then(function(res){
      console.log('projects' , res);
      cb(null, res);
  })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}

function postProject(project, cb){
  models.Project(project).save()
    .then(function(res){
      cb(null, res);
    })
    .catch(function(err){
      cb(err);
    });
}

// ----- USER METHODS -----

function getUsers(cb){
  models.User.find()
    .then(function(res){
      console.log('users' , res);
      cb(null, res);
  })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}

function getUserById(userId, cb){
  models.User.findOne({_id : userId})
    .then(function(res){
      console.log('user' , res);
      cb(null, res);
  })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}

function postUser(user, cb){
  models.User(user).save()
    .then(function(res){
      cb(null, res);
    })
    .catch(function(err){
      cb(err);
    });
}

// ----- SESSION METHODS -----

function getSessionById(sessionId, cb){
  models.Session.findOne({sessionId: sessionId})
    .then(function(res){
      console.log('session' , res);
      cb(null, res);
  })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}

function postSession(session, cb){
  models.Session(session).save()
    .then(function(res){
      cb(null, res);
    })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}

// ----- FEEDBACK METHODS -----

function getFeedbackByProjectId(projectId, cb){
  models.Feedback.find({projId: projectId})
    .then(function(res){
      console.log('feedback for project' , res);
      cb(null, res);
  })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}

function getFeedbackByUserId(userId, cb){
  models.Feedback.find({userId: userId})
    .then(function(res){
      console.log('feedback for user' , res);
      cb(null, res);
  })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}

function postFeedback(feedback, cb){
  models.Feedback(feedback).save()
    .then(function(res){
      cb(null, res);
    })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}
