module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      compileTheme: {
        src: 'src/less/styles.less',
        dest: 'src/css/style.css'
      }
    },
    watch: {
      less: {
        files: ["**/*.less"],
        tasks: ['less'],
      },
      html: {
        files: ["**/*.html"]
      },
      js: {
        files: ["**/*.js"]
      },
      options: {
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['less']);

};
