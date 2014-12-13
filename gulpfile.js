var gulp = require('gulp');
var browserify = require('browserify');
var streamify = require('gulp-streamify')
var uglify = require('gulp-uglify')
var source = require('vinyl-source-stream')
var sass = require('gulp-sass');

gulp.task('browserify', function() {
  var bundleStream = browserify('./js/main.js').bundle()

  bundleStream
    .pipe(source('./js/main.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./build'))
});

gulp.task('sass', function() {
  gulp.src('./css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/css'))
});
