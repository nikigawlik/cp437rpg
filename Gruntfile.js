module.exports = function (grunt) {
    // project config
    grunt.initConfig({
        fixturesPath: "fixtures",

        // pkg: grunt.file.readJSON("package.json"),
        copy: {
            test: {
                expand: true,
                cwd: 'project/src/',
                src: '**',
                dest: 'project/test/',
                flatten: true,
                filter: 'isFile',
            },
        },
        htmlbuild: {
            test: {
                expand: true,
                cwd: "project/src",
                src: 'index.html',
                dest: 'project/test/',
                options: {
                    scripts: {
                        gamefiles: [
                            'project/src/*.js',
                        ],
                    },
                }
            }
        },
        watch: {
            files: "project/src/**/*",
            tasks: "default",
        },
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // default tasks
    grunt.registerTask("default", ["copy:test", "htmlbuild:test"]);
    
    // other tasks
    // grunt.registerTask("build", ["copy:build"]);
};