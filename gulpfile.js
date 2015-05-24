'use strict';
let gulp = require('gulp');
let gutil = require('gulp-util');
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
    .pipe(gulp.dest('./app/styles'));
});

gulp.task('copy-bower-components', ['octicons']);

gulp.task('coffee', function () {
  return gulp.src([
    './src/**/*.coffee',
    './static/**/*.coffee'
    ])
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./app/'));
});

gulp.task('static', function () {
  return gulp.src('./static/**/*')
    .pipe(gulp.dest('./app/static'));
});

gulp.task('resources', function () {
  return gulp.src('./resources/**/*')
    .pipe(gulp.dest('./app/resources'));
});

gulp.task('scss', function () {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/styles'));
});

gulp.task('build', ['bower', 'copy-bower-components', 'coffee', 'static',
  'resources', 'scss']);

gulp.task('default', ['run']);
