var browserSync = require('browser-sync').create(),
    gulp = require('gulp'),
    watch = require('gulp-watch');

gulp.task('default', function () {
    gulp.start('watch');
})

gulp.task('cssInject', ['css'], function () {
    return gulp.src('./app/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function () {
    browserSync.reload();
})

gulp.task('watch', function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: 'app'
        }
    });
    watch('./app/assets/css/**/*.css', function () {
        gulp.start('cssInject');
    });
    watch('./app/assets/js/**/*.js', function () {
        gulp.start('scriptsRefresh');
    })
    watch('./app/index.html', function () {
        browserSync.reload();
    });
});
