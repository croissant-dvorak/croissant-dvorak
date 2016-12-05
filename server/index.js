'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var db = require('./db.js');
var models = require('./models.js');
var config = require('./config.js');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

module.exports = app;

// ----- MIDDLEWARE -----
app.use(express.static(__dirname + '/../client'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: 'favorite food',
    key: 'dvorak',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request.
    saveUninitialized: false  //Forces a session that is "uninitialized" to be saved to the store.
}));
app.use(passport.initialize());
app.use(passport.session());
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

// ----- PASSPORT FOR AUTH -----
passport.use(new FacebookStrategy(config.fbObj,
    function(accessToken, refreshToken, profile, cb) {
        console.log('profile', profile);
        models.User.findOrCreate({ facebookId: profile.id, email: profile._json.email }, function (err, user) {
            console.log('in findOrCreate', user);
          return cb(err, user);
        });
      }
));
passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.facebookId);
});
passport.deserializeUser(function(id, done) {
    console.log('deserializeUser', id);
    db.getUserByFacebookId(id, function (err, user) {
        done(err, user);
        return 'hello';
    });
});

// ----- AUTH ROUTES -----
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function(req, res) {
            // Successful authentication, redirect home.
        res.redirect('/');
    });

function ensureAuthenticated(req, res, next) {
    console.log('checking auth');
    if (req.isAuthenticated()) {
        console.log('you may passs');
        return next();
    } else {
        console.log('not logged in');
        res.redirect('/login');
    }
}

// ----- log ROUTES -----
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
//temp fix:
app.get('/login', function(req, res) {
    res.redirect('/')
});


// ----- other ROUTES -----
app.get('/', function(req, res) {
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
app.post('/api/projects',
    ensureAuthenticated,
    function(req, res) {
        db.postProject(req.body, function(err, result){ //post the project to the db
            if (err) {
                console.error(err);
            } else {
                // console.log('project post result', result);
                res.location('/'); //return to index
                res.sendStatus(201); //201 data good
            }
        });
    }
);

app.get('/api/projects?*', function(req, res) { //requests a specific project DATA, not the react page
    db.getProjects(function(err, projects) {
        res.status(200).end(JSON.stringify(projects));
    });
});


app.get('/api/projects', function(req, res) { //ALL projects
    db.getProjects(function(err, projects) {
        res.status(200).end(JSON.stringify(projects));
    });
});


app.get('/projects', function(req, res) { //requests a
    db.getProjects(function(err, projects) {
        res.status(200).end(JSON.stringify(projects));
    });
});


app.get('/sessions', function(req, res) {
    db.getSession(function(err, session) {
        res.status(200).end(JSON.stringify(session));
    });
});

app.post('/api/users', ensureAuthenticated, function(req, res) {
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

// ----- LISTEN -----
var port = process.env.PORT || 4040;
app.listen(port);
console.log('Listening on port ' + port);
