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
  getUserByUserName : getUserByUserName,
  postUser : postUser,
  getSessionById : getSessionById,
  getSession: getSession,
  postSession : postSession,
  getComments : getComments,
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
      cb(null, res);
  })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}

function getProjectById(projectId, cb){
  models.Project.findOne({ _id: projectId })
    .then(function(res) {
      cb(null, res);
  })
    .catch(function(err) {
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

function getUserByUserName(username, cb){
  models.User.findOne({username : username})
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
  getUserByUserName(user.username, function(err, response) {
    if (err === null) {
      models.User(user).save()
        .then(function(res){
          cb(null, res);
        }).catch(function(err){
            cb('something went wrong', err);
      });
    } else {
      cb(err)
    }
  })


}

// ----- SESSION METHODS -----


function deleteSession(_id, cb){
  models.Session.remove({userId: _id})
    .then(function(res){
      cb(null, res);
  })
    .catch(function(err){
      cb(err);
    });
}


function getSession(cookie){
  console.log('LOOKIN FOR', cookie)
  return models.Session.findOne({session: cookie})
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}

function getSessionById(_id, cb){
  console.log('LOOKIN FOR', _id)
  models.Session.findOne({userId: _id})
    .then(function(res){
      console.log('session' , res);
      cb(null, res);
  })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}

<<<<<<< HEAD
function postSession(session, _id, cb){
  getSessionById(_id, function(err, response) {
    console.log('in post session', err, response)
    if (response === null) {
      console.log('creating!, no exist')
      models.Session(session).save()
        .then(function(res){
          cb(null, res);
        })
        .catch(function(err){
          console.error('Error', err);
          cb(err);
        });
    } else if (response) {
      deleteSession(response.userId, function(err, response) {
        if (err) console.log(err)
        models.Session(session).save()
          .then(function(res){
            cb(null, res);
          })
          .catch(function(err){
            console.error('Error', err);
            cb(err);
          });
      })
    }
  })
}

// ----- BACK METHODS -----
=======
// ----- COMMENT METHODS -----

function getComments(cb){
  models.Comment.find()
    .then(function(res){
      cb(null, res);
  })
    .catch(function(err){
      console.error('Error', err);
      cb(err);
    });
}
>>>>>>> 21f88f87c6e276fc4c8dfa280c2090adeb8015ed

function getCommentByProjectId(projectId, cb){
  models.Comment.find({projectId: projectId})
    .then(function(res){
      console.log('comments for project', res);
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
      console.log('comments for user', res);
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
