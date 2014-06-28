module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                es3: true,
                forin: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                undef: true,
                quotmark: 'single',
                browser: true,
                predef: ['RB'],
                ignores: [
                    'js/development/html5shiv.js',
                    'js/development/respond.src.js'
                ]
            },
            files: {
                src: ['js/development/**/*']
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.version %> */\n'
            },
            mainMinify: {
                files: {
                    'js/production/main.js': [
                        'js/development/templates.js',
                        'js/development/utils.js',
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
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify', 'less']);

};