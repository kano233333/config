var gulp = require("gulp");
var connect = requrie("gulp-connect");
var browserify = require("browserify");
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var less = require("gulp-less");
var sass = require("gulp-sass");

//启动服务器
gulp.task("connect",function(){
	connect.server({
		root: "./",
		livereload: true，
		port:""
	})
});

//刷新页面
gulp.task('reload',async function(){
  gulp.src("./index.html").pipe(connect.reload());
})

//监听，重载
gulp.task('watch',async function(){
  gulp.watch("./*.js",gulp.series('js-build','reload'));
  gulp.watch("./index.html",gulp.series("reload"));
});

//jsx
gulp.task('jsx-build', function() {
  return browserify('./*.js')
    .transform(babelify, {
        presets: ['es2015', 'react']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build'));
});

//less
gulp.task('less-build',async function(){
	gulp.src("./*.less").pipe(
		less()
	).pipe(
		gulp.dest("./build/css")
	)
});

//sass
gulp.task('sass-build',async function(){
	gulp.src("./*.less").pipe(
		sass()
	).pipe(
		gulp.dest("./build/css")
	)
});

gulp.task('default', gulp.parallel('server','js-build','watch'));
