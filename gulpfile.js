var gulp = require('gulp');
var run = require('gulp-run');
'use strict';

let sass = require('gulp-sass');

gulp.task('scss', function () {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('run', function () {
  return run("node_modules/.bin/electron .").exec();
})

gulp.task('default', ['run']);