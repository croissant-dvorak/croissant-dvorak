var db = require('./db.js');
var bcrypt = require('bcrypt-nodejs');

var userFunctions = {}

userFunctions.signUp = function(req, res) {
    var userData = req.body
    var salt = bcrypt.genSaltSync(1337);
    var hash = bcrypt.hashSync(userData.password, salt);
    userData.passwordHash = hash
    db.postUser(userData, function(err, user) {
        if (err) {
            res.status(200).send('Erorr username ' + req.body.username + ' is taken, please choose another.');
        } else {
          res.redirect('/login')
        }
        // console.log('user', user)
    })
}

userFunctions.login = function(req, res) {
    db.getUserByUserName(req.body.username, function(err, returnData) {
      if (err) {
        res.status(404).end('worng user/pass combo')
      } else if (returnData.passwordHash) {
            if (returnData !== [] && req.body.username === returnData.username) {
                if (bcrypt.compareSync(req.body.password, returnData.passwordHash)) {
                    createSession(returnData, res)
                } else {
                  res.status(404).end('worng user/pass combo')
                }
            }
        } else {
          res.status(404).end('worng user/pass combo')
        }
    })

    function createSession(userData, res) {
        var salt = bcrypt.genSaltSync(1337);
        var hash = bcrypt.hashSync(userData.username + userData._id, salt)
        db.postSession({userId: userData._id, session: hash}, userData._id, function(err, sessionData) {
            res.cookie('_id', userData._id)
            res.cookie('session_id', sessionData.session)
            console.log('rezzing')
            res.redirect('/')
        })
    }

}

module.exports = userFunctions
