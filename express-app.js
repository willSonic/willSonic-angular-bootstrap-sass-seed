/**
 * Satellizer Node.js Example
 * (c) 2015 Sahat Yalkabov
 * License: MIT
 */

var path = require('path');
var qs = require('querystring');

var async = require('async');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var colors = require('colors');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment');
var request = require('request');

var config = require('./config');

var TOKEN_SECRET = 'bujoubantu';

//pw = wsSeed1234
var user = {
    id:"12345",
    email: 'willsonic@wsseed.com',
    password: '$2a$10$N0zOEdEVqWAR2dWr1TB7jusRSkP/xBSJ0YY70oZm3kWYZUnIVnkVK',
    displayName: 'willsonic'
};



function comparePassword(password, done) {
    bcrypt.compare(password, userSchema.password, function(err, isMatch) {
        done(err, isMatch);
    });
};


var app = express();

app.set('port', 3000);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    var token = req.headers.authorization.split(' ')[1];

    var payload = null;
    try {
        payload = jwt.decode(token, TOKEN_SECRET);
    }
    catch (err) {
        return res.status(401).send({ message: err.message });
    }

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: 'Token has expired' });
    }
    req.user = payload.sub;
    next();
}

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(_user) {
    var payload = {
        sub: _user.id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, TOKEN_SECRET);
}

/*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */
app.get('/api/me', ensureAuthenticated, function(req, res) {

    if(req.user.email === user.email && req.user.email.password === user.password ) {
        res.send(user);
    }else{
        res.send(new Error("The error IncorrectLogin"));
    }
});

/*
 |--------------------------------------------------------------------------
 | PUT /api/me
 |--------------------------------------------------------------------------
 */
app.put('/api/me', ensureAuthenticated, function(req, res) {
    if(req.user.email === user.email && req.user.email.password === user.password ) {
        res.status(200).end();
    }else{
        return res.status(400).send({ message: 'User not found' });
    }
});


/*
 |--------------------------------------------------------------------------
 | Log in with Email
 |--------------------------------------------------------------------------
 */
app.post('/auth/login', function(req, res) {
       if(req.user.email != user.email || req.user.email.password != user.password ) {
            return res.status(401).send({ message: 'Invalid email and/or password' });
        }
        comparePassword(req.body.password, function(err, isMatch) {
            if (!isMatch) {
                return res.status(401).send({ message: 'Invalid email and/or password' });
            }
            res.send({ token: createJWT(user) });
        });
});

/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------------------------------
 *app.post('/auth/signup', function(req, res) {
 *   User.findOne({ email: req.body.email }, function(err, existingUser) {
 *      if (existingUser) {
 *            return res.status(409).send({ message: 'Email is already taken' });
 *        }
 *       var user = new User({
 *            displayName: req.body.displayName,
 *           email: req.body.email,
 *           password: req.body.password
 *        });
 *       user.save(function(err, result) {
 *            if (err) {
 *                res.status(500).send({ message: err.message });
 *            }
 *            res.send({ token: createJWT(result) });
        });
    });
});

 */
/*
 |--------------------------------------------------------------------------
 | Start the Server
 |--------------------------------------------------------------------------
 */
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});