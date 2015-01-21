module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
            mangle: true,
            compress: true,
            sourceMap: true,
            sourceMapName: 'touch-modal.min.js.map'
        },
        files: {
            'touch-modal.min.js': [
                'src/touch-modal.js'
            ]
        },
        dist: {
            src: 'touch-modal.js',
            dest: 'touch-modal.min.js'
        }
    }
  })
   grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};