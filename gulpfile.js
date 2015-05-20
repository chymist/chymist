'use strict';
let gulp = require('gulp');
let run = require('gulp-run');
let sass = require('gulp-sass');
let bower = require('gulp-bower');
let coffee = require('gulp-coffee');

gulp.task('bower', function () {
  return bower()
    .pipe(gulp.dest('./bower_components'))
});

gulp.task('octicons', ['bower'], function () {
  return gulp.src('./bower_components/octicons/octicons/*.{css,woff}')
    .pipe(gulp.dest('./app/static'));
});

gulp.task('copy-bower-components', ['octicons']);

gulp.task('coffee', function () {
  return gulp.src('./coffee/**/*.coffee')
    .pipe(gulp.dest('./app/'));
});

gulp.task('static', function () {
  return gulp.src('./static/**/*')
    .pipe(gulp.dest('./app/static'));
})

gulp.task('scss', function () {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/static'));
});

gulp.task('run', ['bower', 'copy-bower-components', 'coffee', 'static', 'scss'], function () {
  return run("node_modules/.bin/electron app/main.js").exec();
});

gulp.task('default', ['run']);
