/*
 * Gulpfile.js
 */

var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var path = require('path');

gulp.task('pug', function buildHTML() {
  return gulp.src('**/*.pug')
  .pipe(pug())
});

gulp.task('less', function () {
  return gulp.src('./**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('.'));
});