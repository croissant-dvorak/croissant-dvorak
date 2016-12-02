var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var db = require('/db.js');
module.exports = app;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static(__dirname + '/../client'));

app.get('/', function (req, res) {
  res.status(200);
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.post('/projects', function (req, res) {
});

app.get('/projects', function (req, res) {
  db.getProjects(function(err, projects) {
    res.status(200).end(projects);
  });
});

app.get('/sessions', function (req, res) {

  db.getSession(function(err, session) {
    res.status(200).end(session);
  });
});

app.post('/users', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.get('/users', function (req, res) {
  db.getUsers(function(err, projects) {
    res.status(200).end(projects);
  });
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
