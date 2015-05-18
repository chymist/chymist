'use strict';
let gulp = require('gulp');
let run = require('gulp-run');
let sass = require('gulp-sass');
let bower = require('gulp-bower');


gulp.task('scss', function () {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('run', function () {
  return run("node_modules/.bin/electron app/").exec();
});

gulp.task('default', ['run']);
