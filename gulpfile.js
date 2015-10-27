'use strict';

var gulp        = require('gulp'),
    babel       = require('gulp-babel'),
    sass        = require('gulp-sass'),
    browserify  = require('browserify'),
    concat      = require('gulp-concat'),
    source      = require('vinyl-source-stream'),
    fileinclude = require('gulp-file-include'),
    del         = require('del');

gulp.task('compile:scripts', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('compile:styles', function () {
  return gulp.src('src/css/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('compile:views', function() {
  return gulp.src('src/index.html')
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy:images', function () {
  return gulp.src('src/img/**/*.{jpg,jpeg,png,gif}')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('bundle', [
  'compile:scripts',
  'compile:styles',
  'compile:views',
  'copy:images'], function () {
  var b = browserify('.tmp/bootstrap.js');
  
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function () {
  return del(['.tmp', 'dist']);
});

gulp.task('default', ['bundle']);