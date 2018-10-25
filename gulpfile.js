var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var cleanCSS = require('gulp-clean-css');
var minifyJS = require('gulp-minify');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');
var runSequence = require('run-sequence');

gulp.task('scss', function () {
	return gulp.src('./src/scss/countrySelect.scss')
		.pipe(sass({ errLogToConsole: true  }))
		.pipe(prefix())
		.pipe(cleanCSS({compatibility: 'ie8', format: {
			breaks: {
				afterAtRule: true,
				afterBlockBegins: true,
				afterBlockEnds: true,
				afterComment: true,
				afterProperty: true,
				afterRuleBegins: true,
				afterRuleEnds: true,
				beforeBlockEnds: true,
				betweenSelectors: true
			},
			indentBy: 1,
			indentWith: 'tab' }, level: 0}))
		.pipe(gulp.dest('./build/css'))
		.pipe(notify("styles compiled"));
});

gulp.task('js', function () {
	return gulp.src('./src/js/countrySelect.js')
		.pipe(gulp.dest('./build/js'))
		.pipe(notify("javascript updated"));
});

gulp.task('handle-sources', ['scss', 'js']);

gulp.task('minify-scss', function () {
	return gulp.src('./build/css/countrySelect.css')
		.pipe(cleanCSS({level: 2, inline: ['all']}))
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest('./build/css'))
		.pipe(notify("styles minified"));
});

gulp.task('minify-js', function () {
	return gulp.src('./build/js/countrySelect.js')
		.pipe(minifyJS({ext:{min:'.min.js'}}))
		.pipe(gulp.dest('./build/js'))
		.pipe(notify("javascript minified"));
});

gulp.task('minify-sources', ['minify-scss', 'minify-js']);

gulp.task('webserver', function() {
	gulp.src('.')
		.pipe(webserver({
			livereload: true,
			directoryListing: true,
			open: './demo.html'
		}));
	gulp.watch('./src/scss/**/*.scss', ['scss']);
	gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('default', ['handle-sources', 'webserver']);
gulp.task('build', function() {
	runSequence('handle-sources', 'minify-sources');
});
