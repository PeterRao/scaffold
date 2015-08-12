var config = {
    html: {
        src: 'src/views/pages/**/*.html',
        dest: 'build/pages'
    },
    sass: {
        src: 'src/public/sass/**/*.scss'
    },
    css: {
        src: 'src/public/css/**/*.css',
        dest: 'build/public/css'
    },
    templates: {
        src: 'src/public/scripts/templates/**/*.hds',
        dest: 'build/public/scripts/templates'
    },
    scripts: {
        src: 'src/public/scripts/**/*.js',
        dest: 'build/public/scripts'
    }
};

module.exports = config;