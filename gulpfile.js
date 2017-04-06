var html = ['./source/*.html'];
var scss = ['./source/scss/*.scss'];
var css = ['./dist/css/*.css'];

var gulp = require("gulp");

var sass = require("gulp-sass");
var cssmin = require("gulp-cssmin");

var htmlmin = require("gulp-htmlmin");

var concat = require("gulp-concat");

gulp.task('minificarhtml',function(){
	return gulp.src(html)
		   .pipe(htmlmin({collapseWhitespace: true}))
		   .pipe(gulp.dest('./dist/'));	
});

gulp.task('compilarcss',function(){
	return gulp.src(scss)
		   .pipe(sass())
		   .pipe(gulp.dest('./dist/css/'));
});

gulp.task('minificarcss',['compilarcss'],function(){
	return gulp.src(css)
		   .pipe(concat('style.min.css'))
		   .pipe(cssmin())
		   .pipe(gulp.dest('./dist/css/'));
});

gulp.task('compmin',['minificarhtml','minificarcss']);

gulp.task('monitorar',function(){
	gulp.watch(html,['minificarhtml']);
	gulp.watch(scss,['minificarcss']);
});