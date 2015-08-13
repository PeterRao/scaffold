var config = {
    jade: {
        src: 'src/views/jade/pages/**/*.jade',
        dest: 'build/pages',
        watch: 'src/view/jade/**/*.jade'
    },
    sass: {
        src: 'src/public/sass/**/*.scss'
    },
    css: {
        src: 'src/public/css/**/*.css',
        dest: 'build/public/css'
    },
    images: {
        src: 'src/public/images/**',
        dest: 'build/public/images'
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