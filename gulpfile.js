var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var jsFiles = 'front/src/js/**/*.js';
var jsDest = 'front/dist/js';

gulp.task('scripts', function () {
  return gulp.src(jsFiles)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(jsDest));
});