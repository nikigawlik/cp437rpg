module.exports = function (grunt) {
    // project config
    grunt.initConfig({
        fixturesPath: "fixtures",

        // pkg: grunt.file.readJSON("package.json"),
        watch: {
            files: "project/src/**/*",
            tasks: "default",
        },
        copy: {
            test: {
                expand: true,
                cwd: 'project/src/',
                src: ['**/*'],
                dest: 'project/test/',
                flatten: true,
                filter: 'isFile',
            },
        },
        ts: {
            test: {
                src: 'project/test/**/*.ts',
                outDir: 'project/test',
                options: {
                    rootDir: 'project/test',
                    strictNullChecks: true,
                }
            }
        },
        htmlbuild: {
            test: {
                expand: true,
                cwd: "project/test",
                src: 'index.html',
                dest: 'project/test/',
                options: {
                    scripts: {
                        gamefiles: [
                            'project/test/**/*.js',
                        ],
                    },
                }
            }
        },
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // default tasks
    grunt.registerTask("default", ["copy:test", "ts:test", "htmlbuild:test"]);

    // other tasks
    // grunt.registerTask("build", ["copy:build"]);
};