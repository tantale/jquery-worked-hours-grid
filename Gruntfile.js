module.exports = function(grunt) {

  grunt.initConfig({

    // Import package manifest
    pkg: grunt.file.readJSON("jquery-worked-hours-grid.json"),

    // Banner definitions
    meta: {
      banner: "/*\n" +
        " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
        " *  <%= pkg.description %>\n" +
        " *  <%= pkg.homepage %>\n" +
        " *\n" +
        " *  Made by <%= pkg.author.name %>\n" +
        " *  Under <%= pkg.licenses[0].type %> License\n" +
        " */\n"
    },

    // Concat definitions
    concat: {
      dist: {
        src: ["src/jquery.worked-hours-grid.js"],
        dest: "dist/jquery.worked-hours-grid.js"
      },
      options: {
        banner: "<%= meta.banner %>"
      }
    },

    // Lint definitions
    jshint: {
      files: ["src/jquery.worked-hours-grid.js"],
      options: {
        jshintrc: ".jshintrc"
      }
    },

    // Minify definitions
    uglify: {
      my_target: {
        src: ["dist/jquery.worked-hours-grid.js"],
        dest: "dist/jquery.worked-hours-grid.min.js"
      },
      options: {
        banner: "<%= meta.banner %>"
      }
    },

    // CoffeeScript compilation
    coffee: {
      compile: {
        files: {
          "dist/jquery.worked-hours-grid.js": "src/jquery.worked-hours-grid.coffee"
        }
      }
    },

    // CSS minification
    cssmin: {
      add_banner: {
        options: {
          banner: '/* jquery-worked-hours-grid by tantale ~ https://github.com/tantale/jquery-worked-hours-grid */'
        },
        files: {
          'dist/jquery.worked-hours-grid.min.css': ['src/jquery-worked-hours-grid.css']
        }
      }
    },

    // Start local server and open demo
    connect: {
      server: {
        options: {
          keepalive: true,
          open: "http://127.0.0.1:8080/demo/index.html",
          port: 8080
        }
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask("default", ["jshint", "concat", "uglify", "cssmin", "connect"]);
  grunt.registerTask("travis", ["jshint"]);

};
