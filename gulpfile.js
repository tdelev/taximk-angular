var gulp = require('gulp');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var rev = require('gulp-rev-append');
var rename = require("gulp-rename");
var git = require('git-rev');
var ngConfig = require('gulp-ng-config');
var eslint = require('gulp-eslint');

var CSS = [
  'bower_components/bootstrap/dist/css/bootstrap.css',
  'bower_components/font-awesome/css/font-awesome.css',
  'css/main.css'
];
var FONTS = [
  'bower_components/font-awesome/fonts/**'
];
var LIB = [
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/angular/angular.min.js',
  'bower_components/angular-ui-router/release/angular-ui-router.min.js'
];
var APP = ['app/**/**.js'];
var TEMPLATES = ['app/**/**.html'];

var DESTINATION = '../taximk-static/';
var DESTINATION_APP = DESTINATION + 'd/';
var DATA = [
  'data/places.json',
  'data/taxi.json'
];

gulp.task('concat-css', function () {
  return gulp.src(CSS)
    .pipe(concat('style.css'))
    .pipe(gulp.dest(DESTINATION_APP));
});

gulp.task('copy-fonts', function () {
  return gulp.src(FONTS)
    .pipe(gulp.dest(DESTINATION + 'fonts/'));
});

gulp.task('copy-index', function () {
  return gulp.src('index.html')
    .pipe(gulp.dest(DESTINATION));
});

gulp.task('concat-lib', function () {
  return gulp.src(LIB)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(DESTINATION_APP));
});

gulp.task('config', function (cb) {
  git.short(function (str) {
    gulp.src('app/config.json')
      .pipe(ngConfig('taximk.config', {
        constants: {
          version: {
            rev: str
          }
        },
        wrap: true
      }))
      .pipe(gulp.dest('app'))
      .on('end', function () {
        cb();
      });
  });
});

gulp.task('data', function (cb) {
  var places = require('./data/places.json');
  var taxi = require('./data/taxi.json');
  gulp.src('app/data.json')
    .pipe(ngConfig('taximk.data', {
      constants: {
        places: places,
        taxi: taxi
      },
      wrap: true
    }))
    .pipe(gulp.dest('app'))
    .on('end', function () {
      cb();
    });
});

gulp.task('concat-app', ['data', 'config'], function () {
  return gulp.src(APP)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(DESTINATION_APP));
});

gulp.task('templates', function () {
  return gulp.src(TEMPLATES)
    .pipe(templateCache('templates.js', {
      module: 'taximk'
    }))
    .pipe(gulp.dest(DESTINATION_APP));
});

gulp.task('copy-data', function () {
  return gulp.src(DATA)
    .pipe(gulp.dest(DESTINATION_APP));
});

var tasks = [
  'concat-css',
  'copy-fonts',
  'concat-lib',
  'concat-app',
  'templates',
  'copy-index',
  'copy-data'
];

gulp.task('cache-break', function () {
  return gulp.src(DESTINATION + 'index.html')
    .pipe(rev())
    .pipe(gulp.dest(DESTINATION));
});

gulp.task('default', tasks, function () {
  gulp.start('cache-break');
});

gulp.task('watch', function () {
  gulp.watch(APP, ['concat-app', 'cache-break']);
  gulp.watch(TEMPLATES, ['templates', 'cache-break']);
  gulp.watch(CSS, ['concat-css', 'cache-break']);
});