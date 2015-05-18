var gulp = require('gulp');
var run = require('gulp-run');

gulp.task('run', function () {
  return run("node_modules/.bin/electron .").exec();
})

gulp.task('default', ['run']);
