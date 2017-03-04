var gulp = require('gulp'),
    modernizr = require('gulp-modernizr');

gulp.task('modernizr', function () {
    return gulp.src(['./seabreeze/assets/css/**/*.css', './seabreeze/assets/js/**/*.js'])
        .pipe(modernizr({ options: ['setClasses'] }))
        .pipe(gulp.dest('./seabreeze/temp/scripts'))
})
