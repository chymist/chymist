/* eslint no-var:0 */
var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');

gulp.task('js', function() {
  return gulp.src('src/**/*.@(js|jsx)')
    .pipe(babel({presets: ['es2015', 'react'], plugins: ['transform-runtime']}))
    .pipe(gulp.dest('build/src'));
});

gulp.task('static', function() {
  return gulp.src(['static/**', '!styles/'])
    .pipe(gulp.dest('build/static'));
});

gulp.task('scss', function() {
  return gulp.src('static/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/static/styles'));
});

gulp.task('copy', function() {
  return gulp.src(['package.json', 'menus/*', 'resources/*'], {base: './'})
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['js', 'scss', 'static', 'copy']);
