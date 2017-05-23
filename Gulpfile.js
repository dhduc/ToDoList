/*
 * Gulpfile.js
 */

var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var path = require('path');
var connect = require('gulp-connect');

gulp.task('pug', function buildHTML() {
  return gulp.src('**/*.pug')
  .pipe(pug({
      pretty: true
  }))
  .pipe(gulp.dest('.'));
});

gulp.task('less', function () {
  return gulp.src('./**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('webserver', function() {
  connect.server({
      livereload: true
  });
});

gulp.task('dev', function() {
  return gulp
    .watch(input, ['pug', 'less'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});