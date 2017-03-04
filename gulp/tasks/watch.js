const gulp        = require('gulp'),
      watch       = require('gulp-watch'),
      browserSync = require('browser-sync').create();

gulp.task('default', function () {
    gulp.start('watch');
})

gulp.task('cssInject', ['css'], function () {
    return gulp.src('./seabreeze/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function () {
    browserSync.reload();
})

gulp.task('watch', function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: 'seabreeze'
        }
    });
    watch('./seabreeze/assets/css/**/*.css', function () {
        gulp.start('cssInject');
    });
    watch('./seabreeze/assets/js/**/*.js', function () {
        gulp.start('scriptsRefresh');
    })
    watch(['./seabreeze/index.html', './seabreeze/views/**/*.html'], function () {
        browserSync.reload();
    });
});
