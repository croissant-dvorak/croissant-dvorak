var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var db = require('./db.js');
var config = require('./config.js');
var cookieParser = require('cookie-parser');
var app = express();
var AuthPort = require('AuthPort');
module.exports = app;
app.use(express.static(__dirname + '/../client'));
// app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


AuthPort.createServer(config.fbObj);

// authport
AuthPort.on("auth", function(req, res, data) {
  //check if new user
  db.getUserIDForUser(data.data.login, function(err, users){
    if (err){
      console.log('error on user lookup', err);
      res.set('location', '/');
      res.sendStatus(500);
    } else {
      if (users.length){ // is already a user
        console.log('found user', users[0]);
        createSessionAndRedirect(users[0].id, data.token, res);
      } else { // make a new user
        db.addUser(data.data, function(err, result){
          if (err){
            res.status(500).send(err);
          } else {
            console.log('inserted user');
            createSessionAndRedirect(result[0], data.token, res);
          }
        });
      }
    }
  });
});

AuthPort.on("error", function(req, res, data){
  res.status(500).send("An error occurred: " + JSON.stringify(data));
});

app.get("/auth/:service", AuthPort.app);


app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/testing.html'));
});

app.get('/account', function(req, res) {
    res.render('account', {
        user: req.user
    });
});

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
