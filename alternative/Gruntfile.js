module.exports = function(grunt) {

  var build = require("./grunt/grunt_build.js")(grunt);
  var addons = require("./grunt/grunt_addons.js")(grunt,build);

  var packageJSON = grunt.file.readJSON('package.json');
  grunt.file.write('VERSION',packageJSON.version); // Update VERSION file
  var config = { pkg: packageJSON };

  build.setConfig(config);
  build.defineBanner('controlsjs',grunt.file.read('src/srcheader.txt'));

  // == Libraries ==============================================================

  build.defineFiles('libs',[
    'src/loader/libs.js'
  ]);

  build.registerTask('libs-debug',{
    clean: [build.debugBuild('libs.js')],
    concat: {
      src: build.getFiles('libs'),
      dest: build.debugBuild('libs.js')
    },
    usebanner: build.debugBanner('libs.js','controlsjs')
  });

  build.registerTask('libs-release',{
    clean: [build.releaseBuild('libs.js')],
    closurecompiler: {
      files: build.compilerFiles('libs.js','libs'),
      options: { compilation_level: 'SIMPLE_OPTIMIZATIONS' }
    },
    usebanner: build.releaseBanner('libs.js','controlsjs')
  });

  grunt.registerTask('libs',['libs-debug','libs-release']);

  // == Library: Hammer.js =====================================================

  build.defineBanner('hammerjs','\n' +
    '/*!\n' +
    ' * Hammer.JS - v<%= pkg.lib_hammerjs.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
    ' * <%= pkg.lib_hammerjs.homepage %>\n' +
    ' *\n' +
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.lib_hammerjs.author.name %> <<%= pkg.lib_hammerjs.author.email %>>;\n' +
    ' * Licensed under the <%= _.pluck(pkg.lib_hammerjs.licenses, "type").join(", ") %> license */\n\n'
  );

  build.defineFiles('lib_hammerjs',[
    'libs/lib_hammerjs/hammer.js'
  ]);

  build.registerTask('lib_hammerjs-debug',{
    clean: [build.debugBuild('hammerjs.js')],
    concat: {
      src: build.getFiles('lib_hammerjs'),
      dest: build.debugBuild('hammerjs.js')
    },
    usebanner: build.debugBanner('hammerjs.js','hammerjs')
  });

  build.registerTask('lib_hammerjs-release',{
    clean: [build.releaseBuild('hammerjs.js')],
    closurecompiler: {
      files: build.compilerFiles('hammerjs.js','lib_hammerjs'),
      options: { compilation_level: 'SIMPLE_OPTIMIZATIONS' }
    },
    usebanner: build.releaseBanner('hammerjs.js','hammerjs')
  });

  grunt.registerTask('lib_hammerjs',['lib_hammerjs-debug','lib_hammerjs-release']);

  // == Library: Knockout.js ===================================================

  build.defineBanner('knockout','\n' +
    '/*!\n' +
    ' * Knockout JavaScript library v<%= pkg.lib_knockout.version %>\n' +
    ' * (c) Steven Sanderson - <%= pkg.lib_knockout.homepage %>\n' +
    ' * License: <%= pkg.lib_knockout.licenses[0].type %> (<%= pkg.lib_knockout.licenses[0].url %>)\n' +
    ' */\n\n'
  );

  build.defineFiles('lib_knockout',[
    'libs/lib_knockout/src/namespace.js',
    'libs/lib_knockout/src/google-closure-compiler-utils.js',
    'libs/lib_knockout/src/version.js',
    'libs/lib_knockout/src/options.js',
    'libs/lib_knockout/src/tasks.js',
    'libs/lib_knockout/src/utils.js',
    'libs/lib_knockout/src/utils.domData.js',
    'libs/lib_knockout/src/subscribables/extenders.js',
    'libs/lib_knockout/src/subscribables/subscribable.js',
    'libs/lib_knockout/src/subscribables/dependencyDetection.js',
    'libs/lib_knockout/src/subscribables/observable.js',
    'libs/lib_knockout/src/subscribables/observableArray.js',
    'libs/lib_knockout/src/subscribables/observableArray.changeTracking.js',
    'libs/lib_knockout/src/subscribables/dependentObservable.js',
    'libs/lib_knockout/src/subscribables/mappingHelpers.js',
    'libs/lib_knockout/src/binding/bindingProvider.js',
    'libs/lib_knockout/src/binding/expressionRewriting.js',
    'libs/lib_knockout/src/binding/bindingAttributeSyntax.js'
  ]);

  build.registerTask('lib_knockout-debug',{
    clean: [build.debugBuild('knockout.js')],
    concat: {
      src: build.getFiles('lib_knockout'),
      dest: build.debugBuild('knockout.js')
    },
    usebanner: build.debugBanner('knockout.js','knockout')
  });

  build.registerTask('lib_knockout-release',{
    clean: [build.releaseBuild('knockout.js')],
    closurecompiler: {
      files: build.compilerFiles('knockout.js','lib_knockout'),
      options: { compilation_level: 'SIMPLE_OPTIMIZATIONS' }
    },
    usebanner: build.releaseBanner('knockout.js','knockout')
  });

  grunt.registerTask('lib_knockout',['lib_knockout-debug','lib_knockout-release']);

  // == Library: FontLoader.js =================================================

  build.defineBanner('fontloader','\n' +
    '/*!\n' +
    ' * FontLoader.js v<%= pkg.lib_FontLoader.version %>\n' +
    ' * (c) 2013 Simon Hanukaev - <%= pkg.lib_FontLoader.homepage %>\n' +
    ' * License: <%= pkg.lib_FontLoader.licenses[0].type %> (<%= pkg.lib_FontLoader.licenses[0].url %>)\n' +
    ' */\n\n'
  );

  build.defineFiles('lib_fontloader',[
    'libs/lib_FontLoader/FontLoader.js'
  ]);

  build.registerTask('lib_fontloader-debug',{
    clean: [build.debugBuild('fontloader.js')],
    concat: {
      src: build.getFiles('lib_fontloader'),
      dest: build.debugBuild('fontloader.js')
    },
    usebanner: build.debugBanner('fontloader.js','fontloader')
  });

  build.registerTask('lib_fontloader-release',{
    clean: [build.releaseBuild('fontloader.js')],
    closurecompiler: {
      files: build.compilerFiles('fontloader.js','lib_fontloader'),
      options: { compilation_level: 'SIMPLE_OPTIMIZATIONS' }
    },
    usebanner: build.releaseBanner('fontloader.js','fontloader')
  });

  grunt.registerTask('lib_fontloader',['lib_fontloader-debug','lib_fontloader-release']);

  // == Loader =================================================================

  build.defineFiles('loader',[
    'src/loader/libs.js',
    'src/loader/loader.js',
    'src/loader/devices.js'
  ]);

  build.registerTask('loader-debug',{
    clean: [build.debugBuild('loader.js')],
    concat: {
      src: build.getFiles('loader'),
      dest: build.debugBuild('loader.js')
    },
    usebanner: build.debugBanner('loader.js',['controlsjs'])
  });

  build.registerTask('loader-release', {
    clean: [build.releaseBuild('loader.js')],
    closurecompiler: {
      files: build.compilerFiles('loader.js','loader'),
       options: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS',
        strict_mode_input: 'false'
      }
    },
    usebanner: build.releaseBanner('loader.js','controlsjs')
  });

  grunt.registerTask('loader',['loader-debug','loader-release']);

  // == Controls.js: Core ======================================================

  build.defineFiles('controlsjs',[
    'src/ng_misc/*.js',
    'src/ng_basic/*.js',
    'src/ng_controls/*.js',
    'src/ng_controls/settings/*.js',
    'libs/lib_json2/*.js'
  ]);

  addons.defineLangFiles('controlsjs',{
    cs: 'src/ng_basic/lang/cs/*.js',
    en: 'src/ng_basic/lang/en/*.js',
    sk: 'src/ng_basic/lang/sk/*.js'
  });

  addons.defineDiFiles('controlsjs',[
    'src/ng_controls/designinfo/*.js'
  ]);

  build.registerTask('ng_basic-debug',{
    clean: [build.debugBuild('ng_basic/')],
    copy: {
      expand: true,
      cwd: 'src/ng_basic/',
      src: 'empty.gif',
      dest: build.debugBuild('ng_basic/')
    }
  });

  build.registerTask('ng_basic-release',{
    clean: [build.releaseBuild('ng_basic/')],
    copy: {
      expand: true,
      cwd: 'src/ng_basic/',
      src: 'empty.gif',
      dest: build.releaseBuild('ng_basic/')
    }
  });

  build.registerTask('ng_controls-debug',{
    clean: [build.debugBuild('ng_controls/')],
    copy: {
      expand: true,
      cwd: 'src/ng_controls/',
      src: 'images/**',
      dest: build.debugBuild('ng_controls/')
    }
  });

  build.registerTask('ng_controls-release',{
    clean: [build.releaseBuild('ng_controls/')],
    copy: {
      expand: true,
      cwd: 'src/ng_controls/',
      src: 'images/**',
      dest: build.releaseBuild('ng_controls/')
    }
  });

  build.registerTask('controls-debug',{
    clean: [build.debugBuild('controls.js')],
    concat: {
      src: build.getFiles('controlsjs'),
      dest: build.debugBuild('controls.js')
    },
    usebanner: build.debugBanner('controls.js',['controlsjs']),
    'ng_basic-debug': true,
    'ng_controls-debug': true,
    execute: addons.add({langs: 'controlsjs',di: 'controlsjs'})
  });

  build.registerTask('controls-release',{
    clean: [build.releaseBuild('controls.js')],
    closurecompiler: {
      files: build.compilerFiles('controls.js','controlsjs'),
      options: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS',
        strict_mode_input: 'false'
      }
    },
    usebanner: build.releaseBanner('controls.js','controlsjs'),
    'ng_basic-release': true,
    'ng_controls-release': true,
    execute: addons.add({langs: 'controlsjs',di: 'controlsjs'})
  });

  grunt.registerTask('controls',['controls-debug','controls-release']);

  // == Controls.js: UI ========================================================

  build.defineFiles('controlsjs_ui',[
    'src/ng_controls/ui/*.js'
  ]);

  addons.defineLangFiles('controlsjs_ui',{
    cs: 'src/ng_controls/ui/lang/cs/*.js',
    en: 'src/ng_controls/ui/lang/en/*.js',
    sk: 'src/ng_controls/ui/lang/sk/*.js'
  });

  addons.defineDiFiles('controlsjs_ui',[
    'src/ng_controls/ui/designinfo/*.js'
  ]);

  build.registerTask('controls-ui-raw-debug',{
    clean: [build.debugBuild('controls-ui.js')],
    concat: {
      src: build.getFiles('controlsjs_ui'),
      dest: build.debugBuild('controls-ui.js')
    },
    usebanner: build.debugBanner('controls-ui.js',['controlsjs']),
    execute: addons.add({langs: 'controlsjs_ui',di: 'controlsjs_ui'})
  });

  build.registerTask('controls-ui-raw-release',{
    clean: [build.releaseBuild('controls-ui.js')],
    closurecompiler: {
      files: build.compilerFiles('controls-ui.js','controlsjs_ui'),
      options: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS',
        strict_mode_input: 'false'
      }
    },
    usebanner: build.releaseBanner('controls-ui.js','controlsjs'),
    execute: addons.add({langs: 'controlsjs_ui',di: 'controlsjs_ui'})
  });

  build.registerTask('controls-ui-debug',{
    'controls-ui-raw-debug': true,
    'lib_hammerjs-debug': true,
    concat: {
      src: [
        build.debugBuild('hammerjs.js'),
        build.debugBuild('controls-ui.js')
      ],
      dest: build.debugBuild('controls-ui.js')
    },
    'clean:lib_hammerjs-debug': true,
    'clean:lib_knockout-debug': true,
    'clean:lib_fontloader-debug': true
  });

  build.registerTask('controls-ui-release',{
    'controls-ui-raw-release': true,
    'lib_hammerjs-release': true,
    concat: {
      src: [
        build.releaseBuild('hammerjs.js'),
        build.releaseBuild('controls-ui.js')
      ],
      dest: build.releaseBuild('controls-ui.js')
    },
    'clean:lib_hammerjs-release': true,
    'clean:lib_knockout-release': true,
    'clean:lib_fontloader-release': true
  });

  grunt.registerTask('controls-ui-raw',['controls-ui-raw-debug','controls-ui-raw-release']);
  grunt.registerTask('controls-ui',['controls-ui-debug','controls-ui-release']);

  // == Controls.js: Langs =====================================================

  build.registerTask('langs-debug',{
    clean: [build.debugBuild('lang/')],
    execute: addons.outputDebug({ langs: 'lang/' }),
    usebanner: build.debugBanner('lang/*.js','controlsjs')
  });

  build.registerTask('langs-release',{
    clean: [build.releaseBuild('lang/')],
    execute: addons.outputRelease({ langs: 'lang/' }),
    usebanner: build.releaseBanner('lang/*.js','controlsjs')
  });

  grunt.registerTask('langs',['langs-debug','langs-release']);

  // == Controls.js Design Info ================================================

  build.registerTask('designinfo-debug',{
    clean: [build.debugBuild('designinfo.js')],
    execute: addons.outputDebug({ di: 'designinfo.js' }),
    usebanner: build.debugBanner('designinfo.js','controlsjs')
  });

  grunt.registerTask('designinfo',['designinfo-debug']);

  // == Clean ==================================================================

  build.registerConfig('clean-debug',{
    clean: [build.debugBuild()]
  });

  build.registerConfig('clean-release',{
    clean: [build.releaseBuild()]
  });

  grunt.registerTask('clean-debug',['clean:clean-debug']);
  grunt.registerTask('clean-release',['clean:clean-release']);
  grunt.registerTask('clean',['clean-debug','clean-release']);

  // == Builds =================================================================

  grunt.registerTask('debug',[
    'clean-debug',
    'loader-debug',
    'controls-debug',
    'controls-ui-debug',
    'langs-debug',
    'designinfo-debug'
  ]);

  grunt.registerTask('release',[
    'clean-release',
    'loader-release',
    'controls-release',
    'controls-ui-release',
    'langs-release'
  ]);

  grunt.registerTask('default',[
    'clean',
    'loader',
    'controls',
    'controls-ui',
    'langs',
    'designinfo'
  ]);

  // ---------------------------------------------------------------------------

  grunt.initConfig(config);

  //Load the plugins
  addons.loadPlugins();
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-closurecompiler');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-execute');
};