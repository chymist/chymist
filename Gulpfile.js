/* eslint no-var:0 */
var gulp = require('gulp');
var babel = require('gulp-babel');
var less = require('gulp-less');

gulp.task('js', function() {
  return gulp.src('src/**/*.@(js|jsx)')
    .pipe(babel({presets: ['es2015', 'react'], plugins: ['transform-runtime']}))
    .pipe(gulp.dest('build/src'));
});

gulp.task('static', function() {
  return gulp.src(['static/**', '!styles/'])
    .pipe(gulp.dest('build/static'));
});

gulp.task('static-less', function() {
  return gulp.src('static/styles/**/*.less')
    .pipe(less({paths: ['static/styles']}))
    .pipe(gulp.dest('build/static/styles'));
});

gulp.task('copy', function() {
  return gulp.src(['package.json', 'menus/*', 'resources/*'], {base: './'})
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['js', 'static', 'static-less', 'copy']);
