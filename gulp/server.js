'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var util = require('util');


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

var middleware = require('./proxy');

var app = express();
var router = express.Router();

var TOKEN_SECRET = 'bujoubantu';

var userSchema = {
  email: 'willsonic@wsseed.com',
  password: 'wsSeed1234',
  displayName: 'willsonic'
};
module.exports = function(options) {

  function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
      routes = {
        '/bower_components': 'bower_components'
      };
    }

    var server = {
      baseDir: baseDir,
      routes: routes
    };


    if(middleware.length > 0) {
      server.middleware = middleware;
    }


    function comparePassword(password, done) {
      bcrypt.compare(password, this.password, function(err, isMatch) {
        done(err, isMatch);
      });
    };

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
    function createJWT(user) {
      var payload = {
        sub: user._id,
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
      if(req.user.email === userSchema.email && req.user.email.password === userSchema.password ) {
        res.send(userSchema);
      }else{
         res.send(new Error("The error IncorrectLogin"));
      }
    });

    /*
     |--------------------------------------------------------------------------
     | Log in with Email
     |--------------------------------------------------------------------------
     */
    app.post('/auth/login', function(req, res) {
        if (!user) {
          return res.status(401).send({ message: 'Invalid email and/or password' });
        }
        comparePassword(req.body.password, function(err, isMatch) {
          if (!isMatch) {
            return res.status(401).send({ message: 'Invalid email and/or password' });
          }
          res.send({ token: createJWT(user) });
        });
    });



   browserSync.instance = browserSync.init({
      startPath: '/',
      server: server,
      browser: browser
    });
  }

  browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
  }));



  gulp.task('serve', ['watch'], function () {
    browserSyncInit([options.tmp + '/serve', options.src]);
  });

  gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(options.dist);
  });

  gulp.task('serve:e2e', ['inject'], function () {
    browserSyncInit([options.tmp + '/serve', options.src], []);
  });

  gulp.task('serve:e2e-dist', ['build'], function () {
    browserSyncInit(options.dist, []);
  });
};
