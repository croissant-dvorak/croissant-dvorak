module.exports = {
    mlObj: {
        username: '',
        pw: ''
    },
    fbObj: {
        clientID: '',
        clientSecret: '',
        callbackURL: 'http://localhost:4040/auth/facebook/callback',
        appId: '',
        profileFields: ['emails'],
        cookie: true, // enable cookies to allow the server to access
        xfbml: true, // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    },
};