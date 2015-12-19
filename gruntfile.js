module.exports = function(grunt) {

    // Project configuration.
    var config{
        paths:{
            'css':'/static/css',
            'img':'/static/img',
            'js':'/static/js',
            'templates':'/templates'
            'sass':'/static_src/sass/',
            'img_src':'/static_src/img/',
            'js_src':'/static_src/js/',
            'html_src':'/templates_src/'
        },
        watch: {
            scripts: {
                files: [paths.sass + '**/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
        },
        compass: { 
            options: {  
                sassDir: paths.sass,
                cssDir: paths.css,
                imageDir: paths.img_src,
                httpPath:   '/',
                environment: 'development',
                outputStyle: 'compact',
                noLineComments: true,
                relativeAssets: true
            }
        },
        
    }


    grunt.initConfig(config);
    //These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};