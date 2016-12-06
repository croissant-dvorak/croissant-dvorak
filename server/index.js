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
var multer  = require('multer');


var app = express();

module.exports = app;

// ----- MIDDLEWARE -----
var upload = multer();
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
  console.log('------------')
  console.log('serializeUser', user)
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
        console.log('user', req.user);
        console.log('you may passs');
        return next();
    } else {
        console.log('not logged in');
        res.redirect('/login');
    }
}

// ----- log ROUTES -----
app.get('/logout', function(req, res) {
    req.end('logging you out!')
    // req.logout();
    // res.redirect('/');
});
//temp fix:
app.get('/login', function(req, res) {
    res.redirect('/auth/facebook')
});


// ----- other ROUTES -----
// index route
app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});


// COMMENTS ROUTES
app.get('/api/comments', function(req, res) {
    console.log('in api/comments');
    db.getComments(function(err, comments) {
        console.log('sending out all comments');
        res.status(200).end(JSON.stringify(comments));
    });
});

app.get('/api/comments/:projectId', function(req, res) {
    console.log('in api/comments/:projectId');
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
            console.log('project comment result', result);
            res.sendStatus(201); //201 data good
        }
    });
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
// app.post('/api/projects/',
//     function(req, res) {
//       console.log('REQBODY', req.body);
//       var genData = {
//         name: req.body.name,
//         geoLocation : {
//           lat : req.body.lat,
//           long : req.body.long
//         },
//         address : {
//           street : req.body.street,
//           street2 : req.body.street2,
//           zip: req.body.zip,
//           city: req.body.city,
//           state: req.body.state,
//           country: req.body.country
//         },
//         description : req.body.description,
//         owner : req.body,
//         startDate : req.body.startDate,
//         compDate : req.body.compDate,
//         picture: 'null' // url to host?
//       }
//       console.log('GENDATA', genData)
//         db.postProject(genData, function(err, result){ //post the project to the db
//             if (err) {
//                 console.error(err);
//             } else {
//                 // console.log('project post result', result);
//                 res.redirect('/'); //return to index
//                 res.sendStatus(201); //201 data good
//             }
//         });
//     }
// );

app.post('/api/projects', upload.single('picture'), function(req, res){//post the project to the db
   console.log("photo?************ ", req.file)
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

//set up api endpoint specifically for img






app.get('/api/projects', function(req, res) { //ALL projects, no query (main page?)
    db.getProjects(function(err, projects) {
        console.log('sending out projects');
        res.status(200).end(JSON.stringify(projects));
    });
});

app.get('/api/projects?*', function(req, res) { //requests a specific project DATA, not the react page
    models.Project.query(req.query, function(error, data){
        console.log('sending out projects ?*');
      res.json(error ? {error: error} : data);
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

// ----- LISTEN -----
var port = process.env.PORT || 4040;
app.listen(port);
console.log('Listening on port ' + port);
