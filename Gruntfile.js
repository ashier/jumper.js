module.exports = function(grunt) {

  "use strict";

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    less: {
      dev: {
        options: {
          paths: ["lib/public/css"],
          yuicompress: true
        },
        files: {
          "lib/public/css/default.css": "lib/public/less/default.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['less']);

  // grunt publish:args
  grunt.registerTask('publish', 'Publish jumper.js', function(args) {

    // grunt.task.run('bar', 'baz');

    var pkg = grunt.file.readJSON('package.json');
    // pkg
    grunt.log.write('Publish some stuff...', args).ok();
  });

};
