'use strict';

var gulp            = require('gulp');
var browserSync     = require('browser-sync');
var browserSyncSpa  = require('browser-sync-spa');
var nodemon         = require('gulp-nodemon');
var proxyMiddleware = require('http-proxy-middleware');
var url             = require('url');


var util = require('util');

var proxy = proxyMiddleware(['/auth', '/api'], {target: 'http://localhost:5000'});

module.exports = function(options) {


  function hasContext( uri) {
      var urlPath = url.parse(uri).path;
      return urlPath.indexOf(contextApi) >=0 || urlPath.indexOf(contextAuth);
  };


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
      routes: routes,
      proxy: "localhost:3000",  // local node app address
      port: 5000,
      notify: true,
      middleware:[proxy]
    };


    //if(middleware.length > 0) {
     // server.middleware = middleware;
    //}

    browserSync.instance = browserSync.init({
      startPath: '/',
      server: server,
      browser: 'firefox'
    });
  }


  browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
  }));

  gulp.task('nodemon', function (cb) {
    var called = false;
    nodemon({
      script: 'express-app.js',
      ignore: [
        'gulpfile.js',
        'node_modules/'
      ]
    })
    .on('start', function () {
      if (!called) {
        called = true;
        cb();
      }
    })
    .on('restart', function () {
      setTimeout(function () {
        browserSync.reload();
      }, 1000);
    });
  });

  gulp.task('serve', ['watch'], function () {
    var called = false;
    nodemon({
      script: 'express-app.js',
      ignore: [
        'gulpfile.js',
        'node_modules/'
      ]
    })
    .on('start', function () {
      if (!called) {
        called = true;
        cb();
      }
    })
    .on('restart', function () {
      setTimeout(function () {
        browserSync.reload();
      }, 1000);
    });
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