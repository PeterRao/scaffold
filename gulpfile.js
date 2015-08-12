var config = require('./task/config'),
    userConf = require('./task/user-conf'),
    del = require('del'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    minimist = require('minimist'),
    runSequence = require('run-sequence'),
    stylish = require('jshint-stylish'),
    browserSync = require('browser-sync').create();

var argv = minimist(process.argv.slice(2));
var watch = !argv.watch;


gulp.task('clean-build', del.bind(
    null, ['build'], {dot: true}
));

gulp.task('clean-publish', del.bind(
    null, ['publish'], {dot: true}
));

gulp.task('sass', function () {
    return gulp.src('./src/public/sass/**/*.scss')
        .pipe($.compass({
            project: __dirname + '/src/public',
            //debug: true,
            css: 'css',
            sass: 'sass',
            sourcemap: watch
        }));
        //.pipe(gulp.dest('build/public'));
    //return $.rubySass('src/public/sass/pages', {compass: true})
    //    .on('err', function (err) {
    //        console.log('Error', err.message);
    //    })
    //    .pipe(gulp.dest('build/public'));
});
gulp.task('css', function () {
    if (watch) {
        return gulp.src('src/public/css/pages/**')
            .pipe($.changed(config.css.dest))
            .pipe(gulp.dest(config.css.dest));
    } else {
        return gulp.src('src/public/css/pages/**/*.css')
            .pipe($.changed(config.css.dest))
            .pipe($.minifyCss())
            .pipe(gulp.dest(config.css.dest));
    }
});
gulp.task('html', function () {
    var opts = {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
    };
    return gulp.src(config.html.src)
        .pipe($.changed(config.html.dest))
        .pipe($.if(!watch, $.htmlmin(opts)))
        .pipe(gulp.dest(config.html.dest));
});
gulp.task('lint', function () {
    return gulp.src('src/public/scripts/!(lib)/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(stylish));
});

gulp.task('templates', function () {
    return gulp.src(config.templates.src)
        .pipe($.changed(config.scripts.dest))
        .pipe($.handlebars())
        .pipe($.defineModule('amd'))
        .pipe($.if(watch, $.uglify()))
        .pipe(gulp.dest(config.templates.dest));
});

gulp.task('scripts', function () {
    return gulp.src(config.scripts.src)
        .pipe($.changed(config.scripts.dest))
        .pipe($.if(!watch, $.uglify()))
        .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('watch', function () {
    gulp.watch(config.sass.src, ['sass']);
    gulp.watch(config.html.src, ['html']);
    gulp.watch(config.css.src, ['css']);
    gulp.watch(config.scripts.src, ['scripts']);
    gulp.watch(config.templates.src, ['templates']);
});

gulp.task('serve', function () {
    browserSync.init({
        proxy: userConf.browserSync.proxy,
        files: ['build/**']
    });
});

gulp.task('rev-all', function () {
    var revAll = new $.revAll({
        dontRenameFile: [/^\/favicon.ico$/g, '.html'],
        dontGlobal: ['require.js']
    });
    return gulp.src('build/**')
        .pipe(revAll.revision())
        .pipe(gulp.dest('publish'))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest('publish'));
});

gulp.task('default', function () {
    runSequence(['lint', 'sass', 'html', 'scripts', 'templates'], 'css', function () {
        if (watch) {
            runSequence('watch', 'serve');
        } else if (argv.release) {
            runSequence('clean-publish','rev-all');
        }
    });
});

