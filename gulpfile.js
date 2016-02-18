
//requirements
var gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer');
      sass = require('gulp-sass'),
      plumber = require('gulp-plumber'),
      browserSync = require('browser-sync'),
      useref = require('gulp-useref'),
      uglify = require('gulp-uglify'),
      gulpIf = require('gulp-if'),
      minifyCss = require('gulp-minify-css'),
      imagemin = require('gulp-imagemin'),
      cache = require('gulp-cache'),
      del = require('del'),
      runSequence = require('run-sequence');

// process sass
gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
      stream: true
    }))
});

// watch
gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
});

// live reload
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
});

// minify and concatenate css and js
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', minifyCss()))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'));
});

gulp.task('minifyCSS', function() {
  return gulp.src('app/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('uglify', function() {
  return gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('useref', function() {
  var assets = useref.assets();

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

// optimize images
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

// copy fonts do dist folder
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

// run gulp clean to delete dist folder
gulp.task('clean', function(callback) {
  del('dist');
  return cache.clearAll(callback);
})

// delete dist but not images folder
gulp.task('clean:dist', function(callback){
  del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback)
});

// default
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
});

// build
gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'useref', 'images', 'fonts'],
    callback
    )
});
