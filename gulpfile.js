var gulp = require('gulp');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');       // js压缩
var jade = require('gulp-jade');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');


var gulpUrl = {
	srcPath: {
		less: './src/less/**/*.less',
		js: './src/js/**/*.js',
		jade: './src/js/**/*.jade',
		images: './src/js/**/*.images'
	},
	destPath: './dist'
}

// css
gulp.task('styles', function(){
	gulp.src( gulpUrl.srcPath.less )
		.pipe( less() ).pipe( minifycss() )
		.pipe( rename({suffix: '.min'}) )
		.pipe( gulp.dest( gulpUrl.destPath+'/css' ) );
});
// js
gulp.task('compress', function() {
	gulp.src( gulpUrl.srcPath.js )
	.pipe( jshint() )
	.pipe( uglify() )
	.pipe( rename({suffix: '.min'}) )
	.pipe( gulp.dest(gulpUrl.destPath+'/js') );
});
// jade
gulp.task('jade', function() {
  gulp.src( gulpUrl.srcPath.jade )
    .pipe( jade({locals: YOUR_LOCALS, pretty: true }) )
    .pipe( gulp.dest(gulpUrl.destPath+'/web') )
});
//图片
gulp.task('images', function() {
	gulp.src( gulpUrl.srcPath.images )
		.pipe( imagemin({ optimizationLevel:3, progressive: true, interlaced: true }) )
		.pipe( gulp.dest(gulpUrl.destPath+'/images') )
});

gulp.task('clean', function(){
	gulp.src( gulpUrl.destPath )
		.pipe( clean() );
})

gulp.task('watch', function(){
	gulp.watch(gulpUrl.srcPath.less, ['styles']);
	gulp.watch(gulpUrl.srcPath.js, ['compress']);
	gulp.watch(gulpUrl.srcPath.jade, ['jade']);
	gulp.watch(gulpUrl.srcPath.images, ['images']);
})

gulp.task('default', ['clean', 'watch'])

// browserSync = require('browser-sync')