module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        path : {
            'css':'static/css/',
            'img':'static/img/',
            'js':'static/js/',
            'html':'templates/',
            'sass':'static_src/sass/',
            'imgsrc':'static_src/img/',
            'jssrc':'static_src/js/',
            'htmlsrc':'templates_src/'
        },
        
        //Watch Task
        watch : {
            options: {
                livereload: true
            },
            sass: {
                files: '<%= path.sass %>**/*.scss',
                tasks: ['compass:compile']
            },
            html: {
                files: '<%= path.htmlsrc %>**/*.html',
                tasks: ['htmlmin:allhtml']
            },
            js: {
                files: '<%= path.jssrc %>**/*.js',
                tasks: ['copy:alljs']
            },
            img: {
                files: '<%= path.htmlsrc %>**/*.{jpg,gif,png}',
                tasks: ['imagemin:allimg']
            }
        },

        //Clean Task
        clean :{
            build:['static/','templates/']
        },

        //Copy Task
        copy: {
            alljs: {
                expand: true, 
                cwd:  '<%= path.jssrc %>',
                src:  '**/*.js',
                dest: '<%= path.js %>'
            }
        },

        //Compass Task
        compass : {
            compile:{
                options: {  
                    sassDir:'<%= path.sass %>',
                    cssDir: '<%= path.css %>',
                    imageDir:'<%= path.imgsrc %>',
                    environment: 'development',
                    outputStyle: 'compact',
                    noLineComments: true,
                    relativeAssets: true
                }
            }
        },

        //Imagemin Task
        imagemin : {
            allimg: {
                files: [{
                    expand: true,
                    cwd: '<%= path.imgsrc %>',
                    src: ['**/*.{png,jpg}'],
                    dest: '<%= path.img %>'
                }]
            }
        },

        //Htmlmin Task
        htmlmin : {
            options: {
                force: true,
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: false,
            },
            allhtml:{
                files:[{
                    expand: true,
                    cwd: '<%= path.htmlsrc %>',
                    src: '**/*.html',
                    dest: '<%= path.html %>'
                }]
            }
        }
    });

    function runAllTasks() {
        grunt.task.run('clean:build');
        grunt.task.run('copy:alljs');
        grunt.task.run('imagemin:allimg');
        grunt.task.run('compass:compile');
        grunt.task.run('htmlmin:allhtml');
    }


    // Plugins.
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', runAllTasks);
};