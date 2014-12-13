var gulp = require('gulp');
var browserify = require('browserify');
var streamify = require('gulp-streamify')
var uglify = require('gulp-uglify')
var source = require('vinyl-source-stream')

gulp.task('browserify', function() {
  var bundleStream = browserify('./js/main.js').bundle()

  bundleStream
    .pipe(source('./js/main.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./build/main.js'))
});
