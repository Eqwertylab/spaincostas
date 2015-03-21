module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      compileTheme: {
        src: 'src/less/style.less',
        dest: 'src/css/style.css'
      }
    },
    watch: {
      less: {
        files: ["**/*.less"],
        tasks: ['less'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['less']);

};
