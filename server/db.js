'use strict';
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var models = require('./models');

// ----- EXPORTS -----
module.exports = {
  getProjects : getProjects,
  getProjectById : getProjectById,
  postProject : postProject,
  getUsers : getUsers,
  getUserById : getUserById,
  getUserByFacebookId : getUserByFacebookId,
  postUser : postUser,
  getSessionById : getSessionById,
  postSession : postSession,
  getCommentByProjectId : getCommentByProjectId,
  getCommentByUserId : getCommentByUserId,
  postComment : postComment
};

// ----- SETUP DB -----
var mongoURI = 'mongodb://'+require('./config.js').mlObj.username+':'+require('./config.js').mlObj.pw+'@ds119718.mlab.com:19718/croissant-dvorak';
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb connection open');
});


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

function getUserByFacebookId(facebookId, cb){
  models.User.findOne({facebookId : facebookId})
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

// ----- BACK METHODS -----

function getCommentByProjectId(projectId, cb){
  models.Comment.find({projId: projectId})
    .then(function(res){
      console.log('comment for project' , res);
      cb(null, res);
  })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}

function getCommentByUserId(userId, cb){
  models.Comment.find({userId: userId})
    .then(function(res){
      console.log('comment for user' , res);
      cb(null, res);
  })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}

function postComment(comment, cb){
  models.Comment(comment).save()
    .then(function(res){
      cb(null, res);
    })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}
