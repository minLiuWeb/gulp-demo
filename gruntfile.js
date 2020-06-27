const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: false
            },
            dist: {
                files: {
                    'grunt/assets/styles/main.css': 'src/assets/styles/main.scss'
                }
            }
        },
        babel: {
            options: {
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'grunt/assets/scripts/main.js': 'src/assets/scripts/main.js'
                }
            }
        },
        watch: {
            js: {
                files: ['src/assets/scripts/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/assets/styles/*.scss'],
                tasks: ['sass']
            }
        }

    });
    loadGruntTasks(grunt)
    grunt.registerTask('default',['sass','babel','watch'])
}