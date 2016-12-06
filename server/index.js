'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var db = require('./db.js');
var models = require('./models.js');
var config = require('./config.js');
var cookieParser = require('cookie-parser');
var Facebook = require('facebook-node-sdk');

var app = express();

module.exports = app;

// ----- MIDDLEWARE -----
app.use(express.static(__dirname + '/../client'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(Facebook.middleware({ appId: '1808407789415964', secret: config.fbObj.clientSecret }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function(req, res, next){  // print out requests
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
    req.end('logging you out!')
    // req.logout();
    // res.redirect('/');
});
//temp fix:
app.post('/login', function(req, res) {
    storeLogin(req)
    res.end('all good')
});

app.get('/login', function(req, res) {
    storeLogin(req)
    res.end('all good')
});

app.get('/test', Facebook.loginRequired(), function (req, res) {
  req.fb.api('/me', function(err, user) {
    if (err) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('boi u needa log in');
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, ' + user.name + '!');
  });
});

// ----- other ROUTES -----
// index route
app.get('/',  Facebook.loginRequired(), function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});


// COMMENTS ROUTES
app.get('/comments/', function(req, res) {
    //render react comments component
});
app.get('/api/comments/*', function(req, res) { //request comments to * where it is the project page id
  //some db function to get project data
});
app.post('/api/comments/', function(req, res) {
    //some db function to get project data
    //no query, project id is passed in request
});


// ACCOUNT ROUTES
app.get('/account', function(req, res) {
    //RENDER ACCOUNT PAGE
    //this page hits /api/account for data
});
app.get('/api/account', function(req, res) {
  //SEND ACCOUNT DATA via DB call
});

//PROJECT API ROUTES
app.post('/api/projects/',
    function(req, res) {
      console.log('REQBODY', req.body);
      var genData = {
        name: req.body.name,
        geoLocation : {
          lat : req.body.lat,
          long : req.body.long
        },
        address : {
          street : req.body.street,
          street2 : req.body.street2,
          zip: req.body.zip,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country
        },
        description : req.body.description,
        owner : cookieParser(req.cookie).c_user,
        startDate : req.body.startDate,
        compDate : req.body.compDate,
        picture: 'null' // url to host?
      }
      console.log('GENDATA', genData)
        db.postProject(genData, function(err, result){ //post the project to the db
            if (err) {
                res.end('please login!');
                console.error(err);
            } else {
                // console.log('project post result', result);
                res.redirect('/'); //return to index
                res.sendStatus(201); //201 data good
            }
        });
    }
);

app.get('/api/projects?*', function(req, res) { //requests a specific project DATA, not the react page
    models.Project.query(req.query, function(error, data){
      res.json(error ? {error: error} : data);
    });
});


app.get('/api/projects', function(req, res) { //ALL projects, no query (main page?)
    db.getProjects(function(err, projects) {
        res.status(200).end(JSON.stringify(projects));
    });
});


app.get('/projects', function(req, res) { //requests the loading of the react
    db.getProjects(function(err, projects) {
        res.status(200).end(JSON.stringify(projects));
    });
});


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

app.get('/api/users', function(req, res) {
    db.getUsers(function(err, users) {
        res.status(200).end(JSON.stringify(users));
    });
});

app.get('/*', function(req, res) {
    res.sendStatus(404);
});


function verifyLogin(req) {

}

function storeLogin(cookies) {
  console.log('signed', cookies.signedCookies)
  console.log('--------------')
  console.log('unsigned', cookies.signedCookies)
}


// ----- LISTEN -----
var port = process.env.PORT || 4040;
app.listen(port);
console.log('Listening on port ' + port);
