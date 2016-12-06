'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var db = require('./db.js');
var models = require('./models.js');
var config = require('./config.js');
<<<<<<< HEAD
var cookie = require('cookie');
var Session = require('express-session')
var userFunctions = require('./login.js');
var bcrypt = require('bcrypt-nodejs');
=======
var cookieParser = require('cookie-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var multer  = require('multer');

>>>>>>> 21f88f87c6e276fc4c8dfa280c2090adeb8015ed

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

<<<<<<< HEAD
=======
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

>>>>>>> 21f88f87c6e276fc4c8dfa280c2090adeb8015ed
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

// COMMENTS ROUTES
app.get('/api/comments', function(req, res) {
    console.log('in api/comments');
    db.getComments(function(err, comments) {
        console.log('sending out all comments');
        res.status(200).end(JSON.stringify(comments));
    });
});
<<<<<<< HEAD
app.get('/api/comments/*', function(req, res) { //request comments to * where it is the project page id
    //some db function to get project data
=======

app.get('/api/comments/:projectId', function(req, res) {
    console.log('in api/comments/:projectId');
    db.getCommentByProjectId(req.params.projectId, function(err, comments) {
        console.log('sending out comments');
        res.status(200).end(JSON.stringify(comments));
    });
>>>>>>> 21f88f87c6e276fc4c8dfa280c2090adeb8015ed
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
app.get('/api/account', function(req, res) {});

app.post('/api/account', function(req, res) {
    db.postUser(JSON.parse(req.body.response), function(err, done) {
        if (err) {
            res.sendStatus(500, err)
        } else {
            res.end(done)
        }
    })
});

//PROJECT API ROUTES
<<<<<<< HEAD
app.post('/api/projects/', function(req, res) {
    verifyLogin(req.get('Cookie')).then(function(response) {
        if (response) {
            var genData = {
                name: req.body.name,
                geoLocation: {
                    lat: req.body.lat,
                    long: req.body.long
                },
                address: {
                    street: req.body.street,
                    street2: req.body.street2,
                    zip: req.body.zip,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country
                },
                description: req.body.description,
                owner: cookieParser(req.cookie).c_user,
                startDate: req.body.startDate,
                compDate: req.body.compDate,
                picture: 'null' // url to host?
            }
            console.log('GENDATA', genData)
            db.postProject(genData, function(err, result) { //post the project to the db
                if (err) {
                    res.end('please login!');
                    console.error(err);
                } else {
                    // console.log('project post result', result);
                    res.redirect('/'); //return to index
                    res.sendStatus(201); //201 data good
                }
            });
        } else {
            res.redirect('/login')
        }
    });

})

app.get('/api/projects?*', function(req, res) { //requests a specific project DATA, not the react page
    models.Project.query(req.query, function(error, data) {
        res.json(error
            ? {
                error: error
            }
            : data);
    });
});

=======
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






>>>>>>> 21f88f87c6e276fc4c8dfa280c2090adeb8015ed
app.get('/api/projects', function(req, res) { //ALL projects, no query (main page?)
    db.getProjects(function(err, projects) {
        console.log('sending out projects');
        res.status(200).end(JSON.stringify(projects));
    });
});

<<<<<<< HEAD
=======
app.get('/api/projects?*', function(req, res) { //requests a specific project DATA, not the react page
    models.Project.query(req.query, function(error, data){
        console.log('sending out projects ?*');
      res.json(error ? {error: error} : data);
    });
});

>>>>>>> 21f88f87c6e276fc4c8dfa280c2090adeb8015ed
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
<<<<<<< HEAD
    db.postUser(req.body, function(err, result) {
=======
    db.postUser(req.body, function(err, result){
>>>>>>> 21f88f87c6e276fc4c8dfa280c2090adeb8015ed
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
