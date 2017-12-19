var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var jsFiles = 'front/src/js/**/*.js';
var jsDest = 'front/dist/js';
var cssFiles = 'front/src/css/**/*.css';
var cssDest = 'front/dist/css';

gulp.task('scripts', function () {
  return gulp.src(jsFiles)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(jsDest));
});

gulp.task('styles', function () {
  return gulp.src(cssFiles)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(cssDest));
});

gulp.task('watch', function () {
  gulp.watch([jsFiles, cssFiles], ['scripts', 'styles']);
});

gulp.task('default', ['scripts', 'styles']);