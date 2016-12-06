'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var db = require('./db.js');
var models = require('./models.js');
var config = require('./config.js');
var cookie = require('cookie');
var userFunctions = require('./login.js');
var bcrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser');
var multer  = require('multer');


var app = express();

module.exports = app;

// ----- MIDDLEWARE -----
var upload = multer();
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) { // print out requests
    console.log('---------');
    console.log('Received', req.method, req.url);
    next();
});

// are you sure we need cors?
app.use(function(req, res, next) { // add cors headers to all responses
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});



// ----- log ROUTES -----
app.get('/logout', function(req, res) {
    res.clearCookie('_id')
    res.clearCookie('session')
    res.redirect('/login')
})
//temp fix:
app.get('/login', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/login.html'));
});
app.get('/signup', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/signup.html'));
});

app.post('/login', function(req, res) {
    userFunctions.login(req, res)
})

app.post('/signup', function(req, res) {
    userFunctions.signUp(req, res)
})

// ----- other ROUTES -----
// index route
app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});


// ----- COMMENTS ROUTES -----
app.get('/api/comments', function(req, res) {
    db.getComments(function(err, comments) {
        console.log('sending out all comments');
        res.status(200).end(JSON.stringify(comments));
    });
});

app.get('/api/comments/:projectId', function(req, res) {
    db.getCommentByProjectId(req.params.projectId, function(err, comments) {
        console.log('sending out comments');
        res.status(200).end(JSON.stringify(comments));
    });
});


// app.get('/api/comments/:id', function(req, res) { //request comments to * where it is the project page id
// });
app.post('/api/comments', function(req, res) {
    db.postComment(req.body, function(err, result){ //post the project to the db
        if (err) {
            console.error(err);
        } else {
            res.sendStatus(201); //201 data good
        }
    });
});
// ----- ACCOUNT ROUTES -----
app.post('/api/account', function(req, res) {
    db.postUser(JSON.parse(req.body.response), function(err, done) {
        if (err) {
            res.sendStatus(500, err)
        } else {
            res.end(done)
        }
    })
});

// ----- PROJECT ROUTES -----
app.post('/api/projects', upload.single('picture'), function(req, res){//post the project to the db
   if (req.file === undefined) {
    obj = req.body
   } else {
   var obj = Object.assign({}, req.body, {pictureData: req.file.buffer, pictureOriginalName: req.file.originalname, mimetype: req.file.mimetype}  )
   }
   
    db.postProject(obj, function(err, result){ //post the project to the db
        if (err) {
            console.error(err);
            res.sendStatus(400);
        } else {
            console.log('project post result', result);
            res.status(200).send(result); //201 data good
        }
    });
});

app.get('/api/projects', function(req, res) {
    if (req.query.name !== undefined) {
        req.body = {
          city: { 
            $regex: req.query.name,
          },
        };
    }
    models.Project.find(req.body).limit(5)
        .then(function(data){
            res.json(data);
        })
        .catch(function(err){
            res.json({error : err});
        })
});

app.get('/projects', function(req, res) {
    db.getProjects(function(err, projects) {
        res.status(200).end(JSON.stringify(projects));
    });
});

// ----- SESSIONS -----
app.get('/sessions', function(req, res) {
    db.getSession(function(err, session) {
        res.status(200).end(JSON.stringify(session));
    });
});

app.post('/api/users', function(req, res) {
    db.postUser(req.body, function(err, result){
        if (err) {
            console.error('Error', err);
        } else {
            res.send(result);
        }
    });
});

// ----- USERS -----
app.get('/api/users', function(req, res) {
    db.getUsers(function(err, users) {
        res.status(200).end(JSON.stringify(users));
    });
});

app.get('/*', function(req, res) {
    res.sendStatus(404);
});

function verifyLogin(req) {}

function storeLogin(cookies) {
    console.log('signed', cookies.signedCookies)
    console.log('--------------')
    console.log('unsigned', cookies.signedCookies)
}

function verifyLogin(requestCookie) {
    var parsedCookie = cookie.parse(requestCookie)
    return db.getSession(parsedCookie.session, function(err, dataBaseQuery) {
        if (dataBaseQuery.session === parsedCookie.session) {
            console.log('trueeee')
            console.log('dataBaseQuery', dataBaseQuery.session)
            console.log('parsedCookie', parsedCookie.session)
            return true //return all good
        } else {
            return false //this is not a valid user
        }
    })
}

// ----- LISTEN -----
var port = process.env.PORT || 4040;
app.listen(port);
console.log('Listening on port ' + port);
