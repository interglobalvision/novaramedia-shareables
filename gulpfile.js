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
  var paths = [
    'admin/js/src/*.js',
    'public/js/src/*.js',
  ];
  return gulp.src(paths)
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
  .pipe(gulp.dest('admin/js/'))
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .on('error', errorNotify)
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('admin/js/'))
  .on('error', errorNotify)
  .pipe(gulp.dest('admin/js/'))
  .pipe(notify({ message: 'Javascript task complete' }));
});

gulp.task('public-javascript', function() {
  return gulp.src('public/js/src/*.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .on('error', errorNotify)
  .pipe(gulp.dest('public/js/'))
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .on('error', errorNotify)
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('public/js/'))
  .on('error', errorNotify)
  .pipe(gulp.dest('public/js/'))
  .pipe(notify({ message: 'Javascript task complete' }));
});

gulp.task('style', function() {
  var paths = [
    'admin/css/**/*.styl',
    'public/css/**/*.styl',
  ];
  return gulp.src(paths, { base: './'} )
  .pipe(plumber())
  .pipe(stylus({
      use: [
        swiss()
      ],
    }))
  .on('error', errorNotify)
  .pipe(autoprefixer())
  .on('error', errorNotify)
  .pipe(gulp.dest('./'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .on('error', errorNotify)
  .pipe(gulp.dest('./'))
  .pipe(notify({ message: 'Style task complete' }));
});

/*
gulp.task('images', function () {
    return gulp.src('www/src/images/*.*')
    .pipe(cache('images'))
    .pipe(imagemin({
      progressive: false
    }))
    .on('error', errorNotify)
    .pipe(gulp.dest('www/img/dist'))
		.pipe(notify({ message: 'Images task complete' }));
});
*/

gulp.task('watch', function() {
  gulp.watch(['admin/js/src/*.js'], ['admin-javascript']);
  gulp.watch(['public/js/src/*.js'], ['public-javascript']);
  gulp.watch(['admin/css/*.styl', 'public/css/*styl'], ['style']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['style', 'javascript']);
