module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.version %> */\n'
            },
            mainMinify: {
                files: {
                    'js/production/main.js': [
                        'js/development/main.js'
                    ]
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "css/development/main.css": "less/main.less"
                }
            },
            production: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {
                    "css/production/main.css": "less/main.less"
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'less']);

};