module.exports = function (grunt) {
    // project config
    grunt.initConfig({
        fixturesPath: "fixtures",

        // pkg: grunt.file.readJSON("package.json"),
        watch: {
            files: "project/src/**/*",
            tasks: "default",
        },
        clean: {
            test: {
                src: ["project/test/**/*.*"],
            },
        },
        copy: {
            test: {
                expand: true,
                cwd: 'project/src/',
                src: ['**/*'],
                dest: 'project/test/',
                filter: 'isFile',
            },
        },
        ts: {
            test: {
                src: 'project/src/**/*.ts',
                outDir: 'project/test',
                tsconfig: "project/src/tsconfig.json",
                options: {
                    rootDir: 'project/src',
                    alwaysStrict: true,
                    strictNullChecks: true,
                    noImplicitAny: true,
                    noImplicitThis: true,
                    noImplicitReturns: true, 
                }
            }
        },
        file_dependencies: {
            test: {
                src: [
                    'project/test/**/*.ts',
                    '!project/test/**/main.ts',
                ],
                options: {
                    extractDefinesRegex: /(?:class|interface)\s+(\w+)/g,
                    extractRequiresRegex: /(?:extends|implements)\s+(\w+)/g
                },
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
                        gamefiles: '<%= orderedFiles %>', 
                        mainfile: [
                            'project/test/**/main.js'
                        ],
                    },
                }
            }
        },
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-file-dependencies');

    /**
     * custom task to turn the .ts files into .js files
     */
    grunt.registerTask('transposeOrderedFiles', function() {
        var files = grunt.config.get('file_dependencies.test.ordered_files');
        grunt.config.set('orderedFiles', files.map(function(a) {return a.slice(0, -2) + "js";}));
    });

    // default tasks
    grunt.registerTask("default", ["clean:test", "copy:test", "ts:test", "file_dependencies:test", "transposeOrderedFiles", "htmlbuild:test"]);

    // other tasks
    // grunt.registerTask("build", ["copy:build"]);
};