module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'lib/index.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', []);

  // grunt publish:args
  grunt.registerTask('publish', 'Publish jumper.js', function(args) {

    // grunt.task.run('bar', 'baz');

    var pkg = grunt.file.readJSON('package.json');
    // pkg
    grunt.log.write('Publish some stuff...', args).ok();
  });

};
