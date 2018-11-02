var gulp = require('gulp');
var gulpSass = require('gulp-sass');

//sass-->css
gulp.task('sass', function() {
    return gulp.src('./src/sass/index.scss')
        .pipe(gulpSass())
        .pipe(gulp.dest('./src/css'))
});
//监听sass
gulp.task('default', function() {
    gulp.watch('./src/sass/index.scss', gulp.series('sass'))
})