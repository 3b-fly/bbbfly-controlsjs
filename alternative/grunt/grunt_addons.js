module.exports = function(grunt,build) {

  var _this = null;
  var _lang_files = {};
  var _lang_files_to_add = {};
  var _di_files = {};
  var _di_files_to_add = {};

  function _doAdd(grunt,options){
    if(options.langs){options.langs.fnc(options.langs.files);}
    if(options.di){options.di.fnc(options.di.files);}
  }

  function _doAddLangs(files){
    if(!files){return;}
    for(var lang in files){
      if(typeof _lang_files_to_add[lang] === 'undefined'){
        _lang_files_to_add[lang] = [];
      }
      for(var i in files[lang]){
        _lang_files_to_add[lang][files[lang][i]] = true;
      }
    }
  }

  function _doAddDis(files){
    if(!files){return;}
    for(var i in files){
      _di_files_to_add[files[i]] = true;
    }
  }

  function _output(debug,options){
    var exec = {};
    var addcall = false;
    for(var i in options){
      var opts = {debug: !!debug};
      switch(i){
        case 'langs':
          opts.langs = {
            dest: options[i],
            fnc: _doOutputLangs
          };
          addcall = true;
        break;
        case 'di':
          opts.di = {
            dest: options[i],
            fnc: _doOutputDis
          };
          addcall = true;
        break;
      }
      exec.options = opts;
    }
    if(addcall){
      exec.call = _doOutput;
    }
    return exec;
  }

  function _doOutput(grunt,options){
    if(options.langs){options.langs.fnc(options.debug,options.langs.dest);}
    if(options.di){options.di.fnc(options.debug,options.di.dest);}
  }

  function _doOutputLangs(debug,dest){
    dest = (debug) ? build.debugBuild(dest) : build.releaseBuild(dest);
    for(var lang in _lang_files_to_add){
      var files = [];
      for(var file in _lang_files_to_add[lang]){
        files.push(file);
      }
      var langTaskName = grunt.task.current.target+'-'+lang;
      var langTaskDest = dest+lang+'.js';
      var runTaskName = '';

      var task = {};
      if(debug){
        task.concat = {
          src: files,
          dest: langTaskDest
        };
        runTaskName = 'concat:'+langTaskName;
      }
      else{
        task.closurecompiler = {
          files: {},
          options: { compilation_level: 'SIMPLE_OPTIMIZATIONS' }
        };
        task.closurecompiler.files[langTaskDest] = files;
        runTaskName = 'closurecompiler:'+langTaskName;
      }
      build.registerTask(langTaskName,task);
      grunt.task.run(runTaskName);
    }
  }

  function _doOutputDis(debug,dest){
    if(!debug){return;}

    var files = [];
    for(var file in _di_files_to_add){
      files.push(file);
    }

    var diTaskName = grunt.task.current.target+'-di';
    build.registerTask(diTaskName,{
      concat: {
        src: files,
        dest: build.debugBuild(dest)
      }
    });
    grunt.task.run('concat:'+diTaskName);
  }

  _this = {

    loadPlugins: function(){
      grunt.loadNpmTasks('grunt-closurecompiler');
      grunt.loadNpmTasks('grunt-contrib-concat');
    },

    defineLangFiles: function(taskName,files){
      _lang_files[taskName] = files;
    },

    defineDiFiles: function(taskName,files){
      _di_files[taskName] = files;
    },

    getLangFiles: function(taskNames){
      var result = {};
      var langs = [];
      if(typeof taskNames !== 'object'){taskNames = [taskNames];}
      for(var i in taskNames){
        var taskLangs = _lang_files[taskNames[i]];
        if(typeof taskLangs === 'function'){taskLangs = taskLangs();}
        langs.push(taskLangs);
      }
      for(var j in langs){
        if(typeof langs[j] === 'object'){
          for(var lang in langs[j]){
            var files = langs[j][lang];
            if(typeof files === 'function'){files = files();}
            if(typeof files !== 'object'){files = [files];}
            if(typeof result[lang] === 'undefined'){result[lang] = [];}
            for(var i in files){
              result[lang].push(files[i]);
            }
          }
        }
      }
      for(var i=1;i < arguments.length;i++){
        for(var lang in result){
          result[lang].push(arguments[i]);
        }
      }
      return result;
    },

    getDiFiles: function(taskNames){
      var result = [];
      if(typeof taskNames !== 'object'){taskNames = [taskNames];}
      for(var i in taskNames){
        var diFiles = _di_files[taskNames[i]];
        if(typeof diFiles === 'function'){diFiles = diFiles();}
        for(var j in diFiles){
          result.push(diFiles[j]);
        }
      }
      for(var i=1;i < arguments.length;i++){
        result.push(arguments[i]);
      }
      return result;
    },

    add: function(options){
      var exec = { options: {} };
      var addcall = false;
      for(var i in options){
        switch(i){
          case 'langs':
            exec.options.langs = {
              files: _this.getLangFiles(options[i]),
              fnc: _doAddLangs
            };
            addcall = true;
          break;
          case 'di':
            exec.options.di = {
              files: _this.getDiFiles(options[i]),
              fnc: _doAddDis
            };
            addcall = true;
          break;
        }
      }
      if(addcall){
        exec.call = _doAdd;
      }
      return exec;
    },

    outputDebug: function(options){
      return _output(true,options);
    },

    outputRelease: function(options){
      return _output(false,options);
    }
  };

  return _this;
};