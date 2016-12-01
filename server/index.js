var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
module.exports = app;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//changes have been made

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
