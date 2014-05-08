/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    // configurable paths
    path: {
        app: 'app'
    },
    connect: {
      options: {
          port: 9000,
          livereload : false,
          /*livereload: 35729,*/
          // change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
      },
      livereload: {
          options: {
              livereload : false,
              open: true,
              keepalive: true,
              base: [
                  '<%= path.app %>'
              ]
          }
      }
    }
  });

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', [
      'connect:livereload'
  ]);

//  grunt.registerTask('default', ['connect:livereload']);

};
