//引入gulp 包
var gulp = require('gulp')

//引入 gulp-webserver的包
var webserver = require('gulp-webserver')

//gulp-webpack包
var webpack = require('gulp-webpack')
//引入 文件名提取 包
var named = require('gulp-named') //npm i gulp-name -D
//拷贝src下的html到build下
gulp.task('copy-index',function(){
	gulp.src('./src/*.html')
		.pipe(gulp.dest('./build/'))
})

//启动一个webserver服务
gulp.task('webserver',function(){
	gulp.src('./build/')
		.pipe(
			webserver({
				host:'localhost',
				port:8000,
				directoryListing:{
					enable:true,
					path:'./build'
				},
				livereload:true
			})
		)
})

//打包js
gulp.task('packjs',function(){
	gulp.src('./src/script/*.js')
		.pipe(webpack({
			//配置一些东西
			output: {
				filename: '[name].js'
			},
			module: {
				//webpack加载第三方的组件
				loaders: [
					//解析某些文件
					{
						test: /.\js$/, //所有以js结尾的文件
						loader: 'imports-loader',
						//排除node_modules里的js
						exclude: './node_modules'
					}
				]
			}
		}))
		.pipe(gulp.dest('./build/script'))
})


gulp.task('watch',function(){
	gulp.watch('./*html',['copy-index'])
	gulp.watch('./src/script/*.js',['packjs'])
})
//定义一个默认任务
gulp.task('default',['copy-index','watch','webserver'],function(){
	console.log('done.');
})
