module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    path : {
        'css':'/static/css',
        'img':'/static/img',
        'js':'/static/js',
        'html':'/templates',
        'sass':'/static_src/sass',
        'imgsrc':'/static_src/img',
        'jssrc':'/static_src/js',
        'htmlsrc':'/templates_src'
    },
    // pkg: grunt.file.readJSON('package.json'),
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // },
    watch : {
        options: {
            livereload: true
        },
        sass: {
            files: ['<%= path.sass %>/**/*.scss'],
            tasks: ['compass']
        },
        html: {
            files: '<%= path.htmlsrc %>/**/*.html',
            tasks: ['htmlmin']
        },
        js: {
            files: '<%= path.jssrc %>/**/*.js',
            tasks: ['copy:js']
        },
        img: {
            files: '<%= path.htmlsrc %>/**/*.{jpg,gif,png}',
            tasks: ['imagemin']
        }
    },
    compass : {
      options: {  
          sassDir:'<%= path.sass %>/sass/',
          cssDir: '<%= path.css %>/',
          imageDir:'<%= path.imgsrc %>/',
          environment: 'development',
          outputStyle: 'compact',
          noLineComments: true,
          relativeAssets: true

      }
    },
    clean : {
        all:{
            src: ['static','templates']
        }
    },
    copy : {
        js: {
            expand: true,
            cwd:  '<%= path.jssrc %>/',
            src:  '**/*',
            dest: '<%= path.js %>/'
        }
    },
    imagemin : {
        files: [{
            expand: true,
            cwd: '<%= path.imgsrc %>/',
            src: ['**/*.{png,jpg}'],
            dest: '<%= path.js %>/'
        }]
    },
    htmlmin : {
        options: {
            force: true,
            removeScriptTypeAttributes: true,
            removeComments: true,
            collapseWhitespace: false,
        },
        files:[{
            expand: true,
            cwd: '<%= path.htmlsrc %>/',
            src: '**/*.html',
            dest: '<%= path.html %>/'
        }]
    }
  });

   function runAllTasks() {
        

        grunt.task.run('clean:all');
        grunt.task.run('copy:js');
        grunt.task.run('imagemin');
        grunt.task.run('compass');
        grunt.task.run('htmlmin');
    }


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task(s).
  grunt.registerTask('default', ['watch:sass']);

    grunt.registerTask('build', runAllTasks);
};