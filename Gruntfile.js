/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    drift: {
      stuff: {}
    }
  });

  grunt.loadTasks('./tasks');

  grunt.registerTask('realWork', function() {
    console.log('now i\'m doing important things!');
  });

  grunt.registerTask('default', ['drift', 'realWork']);

};
