/**
 * Created by ecook on 4/29/17.
 */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});


gulp.task('webserver', function() {
    gulp.src('./build')
      .pipe(webserver({
          livereload: true,
          port: 5001,
          open: true,
          fallback : './build/index.html'
      }));
});

/*
host: '0.0.0.0',
      port: 6639,
      livereload: true,
      open: true,
      fallback: './dist/index.html'
*/