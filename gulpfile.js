var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    notify      = require('gulp-notify'),
    cleanCSS    = require('gulp-clean-css'),
    http        = require('http'),
    ecstatic    = require('ecstatic'),
    browserSync = require('browser-sync');

gulp.task('sass', function () {
  gulp.src('./src/scss/countrySelect.scss')
    .pipe(sass({ errLogToConsole: true }))
    .pipe(prefix(['last 4 versions']))
    .pipe(gulp.dest('./build/css'))
    .pipe(notify("styles compiled"))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('minify', function () {
  gulp.src('./build/css/countrySelect.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(prefix(['last 4 versions']))
    .pipe(gulp.dest('./build/css'))
    .pipe(notify("styles minified"))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
  http.createServer(
    ecstatic({ root: __dirname })
  ).listen(8080);
  browserSync({
    proxy: "0.0.0.0:8080",
    files: ["./build/js/**/*.js"],
    ghostMode: false,
    notify: false,
  });
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch("./**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'watch']);
gulp.task('build', ['sass', 'minify']);
