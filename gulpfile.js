var html = ['./source/*.html'];
var css = ['./source/scss/*.scss'];

var gulp = require("gulp");

var sass = require("gulp-sass");
var cssmin = require("gulp-cssmin");
var comentcss = require("gulp-strip-css-comments");

var htmlmin = require("gulp-htmlmin");

var concat = require("gulp-concat");

gulp.task('minificarhtml',function(){
	return gulp.src(html)
		   .pipe(htmlmin({collapseWhitespace: true}))
		   .pipe(gulp.dest('./dist/'));	
});

gulp.task('compilarcss',function(){
	return gulp.src(css)
		   .pipe(sass().on('error', sass.logError))
		   .pipe(gulp.dest('./dist/css/'));
});

gulp.task('minificarcss',['compilarcss'],function(){
	return gulp.src('./dist/css/*.css')
		   .pipe(concat('style.min.css'))
		   .pipe(commentcss())
		   .pipe(cssmin())
		   .pipe(gulp.dest('./dist/css/'));
});

gulp.task('compmin',['minificarhtml','minificarcss']);

gulp.task('monitorar',function(){
	gulp.watch(html,['minificarhtml']);
	gulp.watch(css,['minificarcss']);
});