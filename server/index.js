var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var db = require('./db.js');
var config = require('./config.js');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var app = express();
module.exports = app;
app.use(express.static(__dirname + '/../client'));
// app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
    secret: 'favorite food',
    key: 'dvorak'
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

passport.use(new FacebookStrategy({
        clientID: config.fbObj.facebook_api_key,
        clientSecret: config.fbObj.facebook_api_secret,
        callbackURL: config.fbObj.callback_url
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            //Check whether the User exists or not using profile.id
            return done(null, profile);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function(req, res) {
            // Successful authentication, redirect home.
        res.redirect('/');
    });


app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


app.get('/login', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/testingLogin.html'));
});

app.get('/', ensureAuthenticated, function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/testing.html'));
});

app.get('/account', function(req, res) {
    res.render('account', {
        user: req.user
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

app.post('/projects', function(req, res) {});

app.get('/projects', function(req, res) {
    db.getProjects(function(err, projects) {
        res.status(200).end(projects);
    });
});

app.get('/sessions', function(req, res) {
    db.getSession(function(err, session) {
        res.status(200).end(session);
    });
});

app.post('/users', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.get('/users', function(req, res) {
    db.getUsers(function(err, projects) {
        res.status(200).end(projects);
    });
});

app.get('/*', function(req, res) {
    res.status(404).end('not found');
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
