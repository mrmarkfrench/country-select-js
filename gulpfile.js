var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    notify      = require('gulp-notify'),
    cleanCSS    = require('gulp-clean-css'),
    minify      = require('gulp-minify'),
    rename      = require('gulp-rename'),
    http        = require('http'),
    ecstatic    = require('ecstatic'),
    browserSync = require('browser-sync');

gulp.task('scss', function () {
  gulp.src('./src/scss/countrySelect.scss')
    .pipe(sass({ errLogToConsole: true }))
    .pipe(prefix())
    .pipe(cleanCSS({compatibility: 'ie8', format: 'beautify', level: 0}))
    .pipe(gulp.dest('./build/css'))
    .pipe(notify("styles compiled"))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
  gulp.src('./src/js/countrySelect.js')
    .pipe(gulp.dest('./build/js'))
    .pipe(notify("javascript updated"))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('handle-sources', ['scss', 'js']);

gulp.task('minify-scss', function () {
  gulp.src('./build/css/countrySelect.css')
    .pipe(cleanCSS({level: 2, inline: ['all']}))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('./build/css'))
    .pipe(notify("styles minified"))
});

gulp.task('minify-js', function () {
  gulp.src('./build/js/countrySelect.js')
    .pipe(minify({ext:{min:'.min.js'}}))
    .pipe(gulp.dest('./build/js'))
    .pipe(notify("javascript minified"))
});

gulp.task('minify-sources', ['minify-scss', 'minify-js']);

gulp.task('watch', function() {
  http.createServer(
    ecstatic({ root: __dirname })
  ).listen(8080);
  browserSync({
    proxy: "0.0.0.0:8080",
    ghostMode: false,
    notify: false,
  });
  gulp.watch('./src/scss/**/*.scss', ['scss']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch("./**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['handle-sources', 'watch']);
gulp.task('build', ['handle-sources', 'minify-sources']);
