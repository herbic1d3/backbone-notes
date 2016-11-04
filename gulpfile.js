const gulp = require('gulp');
const nunjucks = require('nunjucks');
const gulpNunjucks = require('gulp-nunjucks');
const concat = require('gulp-concat');
 
var templates = {
    src: 'views/*.html',
    dst: 'public/dist/'
};

/**
 * Nunjucks
 */
gulp.task('nunjucks', function() {
    var Env = new nunjucks.Environment();

    function getCorrectTemplateName(name) {
        return name.path
            .replace(name.cwd, '')
            .replace('/frontend/templates/', '');
    }

    gulp.src('frontend/templates/**/*.html')
        .pipe(gulpNunjucks({
            env: Env,
            name: getCorrectTemplateName
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('public/javascripts/tpl/'))
});

/**
 * Start and Watching changes
 */
gulp.task('default', ['nunjucks'], function() {
    gulp.watch(
        ['frontend/templates/**/*.html'],
        ['nunjucks']
    );
});
