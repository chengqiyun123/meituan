var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var webserver = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');

//sass-->css
gulp.task('sass', function() {
    return gulp.src('./src/sass/index.scss')
        .pipe(gulpSass())
        .pipe(gulp.dest('./src/css'))
});
//监听sass
gulp.task('default', function() {
    gulp.watch('./src/sass/index.scss', gulp.series('sass'))
});
var list = require('./src/mock/data.json');
console.log(list);
//起服务
gulp.task('server', function() {
    return gulp.src('./src/')
        .pipe(webserver({
            port: 8080,
            host: 'localhost',
            fallback: 'index.html',
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return res.end();
                }
                var pathname = url.parse(req.url).pathname;
                if (/^\/api/.test(pathname)) { //接口
                    console.log(pathname);
                    if (pathname === '/api/init') {
                        res.end(JSON.stringify({ code: 0, data: list }))
                    } else if (pathname = '/api/inits') {
                        res.end(JSON.stringify({ code: 0, data: list }))
                    }
                } else { //读文件
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})