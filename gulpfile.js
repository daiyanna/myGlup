var gulp = require('gulp');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');

var less = require('gulp-less');
var minifycss = require('gulp-minify-css');//压缩css
var uglify = require('gulp-uglify');       // js压缩
var jade = require('gulp-jade');
var imagemin = require('gulp-imagemin');//压缩图片
var jshint = require('gulp-jshint');//检查js


var gulpUrl = {
	srcPath: {
		less: './src/less/**/*.less',
		js: './src/js/**/*.js',
		jade: './src/jade/**/*.jade',
		img: './src/images/**/*.{png,jpg,gif,ico}'
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
    .pipe( jade({pretty: true}) )
    .pipe( gulp.dest(gulpUrl.destPath+'/web') )
});
//图片
gulp.task('images', function() {
	gulp.src( gulpUrl.srcPath.img )
		// .pipe( imagemin() ) 
		.pipe( gulp.dest(gulpUrl.destPath+'/images') )
});
// gulp.task('clean', function(){
// 	gulp.src( gulpUrl.destPath )
// 		.pipe( clean() );
// })
//自动刷新页面
gulp.task('browser', function () {
	browserSync.init([gulpUrl.destPath+'/css', gulpUrl.destPath+'/js', gulpUrl.destPath+'/web', gulpUrl.destPath+'/images'], {	//改动了这些文件需要自动刷新
		server: {baseDir: gulpUrl.destPath }	//默认localhost:3000指向的目录  url访问：http://localhost:3000/web/index.html
	});
});
gulp.task('watch', function(){
	gulp.watch(gulpUrl.srcPath.less, ['styles']);
	gulp.watch(gulpUrl.srcPath.js, ['compress']);
	gulp.watch(gulpUrl.srcPath.jade, ['jade']);
	gulp.watch(gulpUrl.srcPath.img, ['images']);
})
gulp.task('init', function(){
	gulp.start('styles', 'compress', 'jade', 'images')
})

gulp.task('default', ['watch', 'browser']);
