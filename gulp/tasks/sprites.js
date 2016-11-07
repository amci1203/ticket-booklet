var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sheet = require('gulp-svg-sprite'),
    toPNG = require('gulp-svg2png'),
    del = require('del');

var config = {
    shape: { spacing: {
      padding: 1
    }},
    mode: { css: {
        variables: {
           changeSVG2PNG: function () {
               return function (sprite, render) {
                   return render(sprite).split('.svg').join('.png');
               }
           }
        },
        sprite: 'sprite.svg',
        render: { css: {
            template: './gulp/templates/sprite.css'
        }}
    }}
};

gulp.task('cleanSprites', function () {
    return del([
        './app/temp/sprite',
        './app/assets/images/sprites'
    ])
})

gulp.task('createSpriteSheet', ['cleanSprites'], function () {
     return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(sheet(config))
        .pipe(gulp.dest('./app/temp/sprite/'));
})

gulp.task('createPNGCopy', ['createSpriteSheet'], function () {
    return gulp.src('./app/temp/sprite/css/*.svg')
        .pipe(toPNG())
        .pipe(gulp.dest('./app/temp/sprite/css'))
})

gulp.task('copySpriteCSS', ['createSpriteSheet'], function () {
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_icon.css'))
        .pipe(gulp.dest('./app/assets/css/modules'));
})

gulp.task('copySpriteFile', ['createPNGCopy'], function () {
    return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
        .pipe(gulp.dest('./app/assets/images/sprites'));
})

gulp.task('endClean', ['copySpriteCSS', 'copySpriteFile'], function () {
    return del(['./app/temp/sprite']);
})

gulp.task('icons', ['cleanSprites', 'createSpriteSheet', 'createPNGCopy', 'copySpriteCSS', 'copySpriteFile', 'endClean'])
