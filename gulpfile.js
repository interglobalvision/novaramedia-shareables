var gulp = require('gulp');
  watch = require('gulp-watch'),
  rename = require('gulp-rename'),
  notify = require('gulp-notify'),
  util = require('gulp-util'),
  plumber = require('gulp-plumber'),
  concat = require('gulp-concat'),

  jshint = require('gulp-jshint'),
  jscs = require('gulp-jscs'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  babel = require('gulp-babel'),

  cache = require('gulp-cached'),

  stylus = require('gulp-stylus'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  swiss = require('kouto-swiss');

function errorNotify(error){
  notify.onError("Error: <%= error.message %>")
  util.log(util.colors.red('Error'), error.message);
}

gulp.task('javascript-check', function() {
  return gulp.src('admin/js/src/*.js')
  .pipe(sourcemaps.init())
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jscs('.jscsrc'))
  .on('error', errorNotify)
  .pipe(notify({ message: 'Javascript check complete' }));
});

gulp.task('admin-javascript', function() {
  return gulp.src('admin/js/src/*.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .on('error', errorNotify)
  .pipe(gulp.dest('admin/js/dist/'))
  .pipe(sourcemaps.init())
  .pipe(uglify({mangle: false}))
  .on('error', errorNotify)
  .pipe(sourcemaps.write('sourcemaps'))
  .on('error', errorNotify)
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('admin/js/dist/'))
  .pipe(notify({ message: 'Javascript task complete' }));
});

gulp.task('style', function() {
  return gulp.src('admin/css/src/*.styl')
  .pipe(plumber())
  .pipe(stylus({
      use: [
        swiss()
      ],
    }))
  .on('error', errorNotify)
  .pipe(autoprefixer())
  .on('error', errorNotify)
  .pipe(gulp.dest('admin/css/dist/'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .on('error', errorNotify)
  .pipe(gulp.dest('admin/css/dist/'))
  .pipe(notify({ message: 'Style task complete' }));
});

gulp.task('watch', function() {
  gulp.watch(['admin/js/src/*.js'], ['admin-javascript']);
  gulp.watch(['admin/css/src/*.styl'], ['style']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['style', 'admin-javascript']);
