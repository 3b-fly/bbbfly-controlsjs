module.exports = function(grunt){
  var path = require('path');

  var srcPath = 'src';
  var libsPath = 'libs';

  var buildPath = 'build';
  var debugPath = 'debug';
  var releasePath = 'release';

  var tempDir = buildPath+'/.temp';
  var debugDir = buildPath+'/'+debugPath;
  var releaseDir = buildPath+'/'+releasePath;

  var packageJSON = grunt.file.readJSON('package.json');
  var controlsJSON = grunt.file.readJSON('controls.json');

  var normalizeLinebreak = function(text){
    return text.replace(/( |\t)*(\r\n|\n\r|\r|\n)/g,'\n');
  };

  grunt.initConfig({
    pkg: packageJSON,
    clean: {
      build: [buildPath],
      temp: [tempDir]
    },
    copy: {
      lib_json2_debug: {
        files: [{
          cwd: libsPath,
          src: ['lib_json2/*.js'],
          dest: tempDir+'/json2',
          expand: true
        }]
      },
      lib_hammerjs_debug: {
        files: [{
          cwd: libsPath,
          src: ['lib_hammerjs/*.js'],
          dest: tempDir+'/hammerjs',
          expand: true
        }]
      },
      lib_fontloader_debug: {
        files: [{
          cwd: libsPath,
          src: ['lib_FontLoader/*.js'],
          dest: tempDir+'/fontloader',
          expand: true
        }]
      },
      loader_src_debug: {
        options: {
          process: function(content){
            return normalizeLinebreak(content);
          }
        },
        files: [{
          cwd: srcPath,
          src: ['loader/loader.js','loader/devices.js'],
          dest: tempDir+'/loader',
          expand: true
        }]
      },
      core_src_debug: {
        options: {
          process: function(content){
            return normalizeLinebreak(content);
          }
        },
        files: [{
          cwd: srcPath,
          src: [
            'ng_misc/*.js','ng_basic/*.js',
            'ng_controls/*.js','ng_controls/settings/*.js'
          ],
          dest: tempDir+'/core',
          expand: true
        }]
      },
      core_imgs_debug: {
        files: [{
          cwd: srcPath,
          src: [
            'ng_misc/**/*.{png,jpg,gif}','ng_basic/**/*.{png,jpg,gif}',
            'ng_controls/images/**/*.{png,jpg,gif}'
          ],
          dest: debugDir,
          expand: true
        }]
      },
      ui_src_debug: {
        options: {
          process: function(content){
            return normalizeLinebreak(content);
          }
        },
        files: [{
          cwd: srcPath,
          src: ['ng_controls/ui/*.js'],
          dest: tempDir+'/ui',
          expand: true
        }]
      },
      imgs_release: {
        files: [{
          cwd: debugDir,
          src: ['**/*.{png,jpg,gif}'],
          dest: releaseDir,
          expand: true
        }]
      },
      lang_en_debug: {
        files: [{
          cwd: srcPath,
          src: [
            'ng_basic/lang/en/*.js',
            'ng_controls/ui/lang/en/*.js'
          ],
          dest: tempDir+'/lang_en',
          expand: true
        }]
      },
      lang_cs_debug: {
        files: [{
          cwd: srcPath,
          src: [
            'ng_basic/lang/cs/*.js',
            'ng_controls/ui/lang/cs/*.js'
          ],
          dest: tempDir+'/lang_cs',
          expand: true
        }]
      },
      lang_sk_debug: {
        files: [{
          cwd: srcPath,
          src: [
            'ng_basic/lang/sk/*.js',
            'ng_controls/ui/lang/sk/*.js'
          ],
          dest: tempDir+'/lang_sk',
          expand: true
        }]
      },
      license: {
        options: {
          process: function(content){
            return normalizeLinebreak(content);
          }
        },
        files: [
          {
            src: 'License Commercial Software.txt',
            dest: debugDir,
            expand: true
          },
          {
            src: 'License Commercial Software.txt',
            dest: releaseDir,
            expand: true
          }
        ]
      }
    },
    concat: {
      lib_json2_debug: {
        src: tempDir+'/json2/**/*.js',
        dest: debugDir+'/json2.js'
      },
      lib_hammerjs_debug: {
        src: tempDir+'/hammerjs/**/*.js',
        dest: debugDir+'/hammerjs.js'
      },
      lib_fontloader_debug: {
        src: tempDir+'/fontloader/**/*.js',
        dest: debugDir+'/fontloader.js'
      },
      loader_src_debug: {
        src: tempDir+'/loader/**/*.js',
        dest: debugDir+'/loader.js'
      },
      core_src_debug: {
        src: tempDir+'/core/**/*.js',
        dest: debugDir+'/controls.js'
      },
      ui_src_debug: {
        src: tempDir+'/ui/**/*.js',
        dest: debugDir+'/controls-ui.js'
      },
      lang_en_debug: {
        src: tempDir+'/lang_en/**/*.js',
        dest: debugDir+'/lang/en.js'
      },
      lang_cs_debug: {
        src: tempDir+'/lang_cs/**/*.js',
        dest: debugDir+'/lang/cs.js'
      },
      lang_sk_debug: {
        src: tempDir+'/lang_sk/**/*.js',
        dest: debugDir+'/lang/sk.js'
      }
    },
    closureCompiler: {
      options: {
        compilerFile: 'node_jar/closure-compiler.jar',
        compilerOpts: {
          compilation_level: 'SIMPLE_OPTIMIZATIONS',
          jscomp_off: ['misplacedTypeAnnotation'],
          strict_mode_input: false
        }
      },
      release: {
        files: [{
          cwd: debugDir,
          src: ['**/*.js'],
          dest: releaseDir,
          expand: true
        }]
      }
    },
    comments: {
      options: {
        keepSpecialComments: false
      },
      remove: {
        files: [{
          cwd: buildPath,
          src: ['**/*.js'],
          dest: buildPath,
          expand: true
        }]
      }
    },
    usebanner: {
      options: {
        linebreak: false,
        process: function(filePath){
          var banner = '';

          switch(path.basename(filePath)){
            case 'json2.js':
              banner = libsPath+'/lib_json2_header';
            break;
            case 'hammerjs.js':
              banner = libsPath+'/lib_hammerjs_header';
            break;
            case 'fontloader.js':
              banner = libsPath+'/lib_fontloader_header';
            break;
            case 'loader.js':
            case 'controls.js':
            case 'controls-ui.js':
              banner = srcPath+'/srcheader.txt';
            break;
            case 'en.js':
            case 'cs.js':
            case 'sk.js':
              banner = srcPath+'/srcheader.txt';
            break;
          }

          if(banner){
            banner = grunt.file.read(banner);
            banner = grunt.template.process(banner);
            banner = normalizeLinebreak(banner+'\n');
          }

          return banner;
        }
      },
      files: {
        cwd: buildPath,
        src: ['**/*.js'],
        dest: buildPath,
        expand: true
      }
    }
  });

  grunt.task.registerTask(
    'exportJSON',
    'Exports controls.json file',
    function(){
      if(controlsJSON.Packages){
        for(var packageName in controlsJSON.Packages){
          var package = controlsJSON.Packages[packageName];
          var debugFiles = package.DebugFiles;
          var releaseFiles = package.ReleaseFiles;

          if(debugFiles){
            for(var i in debugFiles){
              debugFiles[i] = debugPath+'/'+debugFiles[i];
            }
          }
          if(releaseFiles){
            for(var j in releaseFiles){
              releaseFiles[j] = releasePath+'/'+releaseFiles[j];
            }
          }
        }
      }
      grunt.file.write(
        buildPath+'/controls.json',
        JSON.stringify(controlsJSON,null,2)
      );
    }
  );

  grunt.registerTask('build',[
    'clean:build',
    'copy:lib_json2_debug','concat:lib_json2_debug',
    'copy:lib_hammerjs_debug','concat:lib_hammerjs_debug',
    'copy:lib_fontloader_debug','concat:lib_fontloader_debug',

    'copy:loader_src_debug','concat:loader_src_debug',
    'copy:core_src_debug','copy:core_imgs_debug','concat:core_src_debug',
    'copy:ui_src_debug','concat:ui_src_debug',

    'copy:lang_en_debug','concat:lang_en_debug',
    'copy:lang_cs_debug','concat:lang_cs_debug',
    'copy:lang_sk_debug','concat:lang_sk_debug',

    'closureCompiler:release','copy:imgs_release',
    'clean:temp','comments:remove','usebanner',
    
    'exportJSON',
    'copy:license'
  ]);

  grunt.registerTask('default','build');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-stripcomments');
  grunt.loadNpmTasks('grunt-banner');
};