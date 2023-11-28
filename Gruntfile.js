module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            dist: ['dist/*']
        },
        jshint: {
            files: ['**/*.js', "!node_modules/**/*", "!dist/*"],
            options: {
                esversion: 11,
                globals: {
                    console: false,
                    module: true
                }
            }
        },
        shell:{
            esbuild: {
                command: 'esbuild src/App.js --bundle --platform=node --packages=external --outfile=dist/bundle.js'
            },
            jest:{
                command: 'jest'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('build', ['clean', 'jshint', 'shell:jest', 'shell:esbuild']);
    grunt.registerTask('test', ['jshint', 'shell:jest']);
};