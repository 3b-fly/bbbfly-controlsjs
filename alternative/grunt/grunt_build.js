module.exports = function(grunt){

  var _this = null;
  var _config = null;
  var _files = {};
  var _banners = {};

  function _defaultBanner(src,debug,banner){
    if(typeof src==='string') src=[src];
    if(debug) {
      for(var i in src) src[i]=_this.debugBuild(src[i]);
    }
    else {
      for(var i in src) src[i]=_this.releaseBuild(src[i]);
    }
    if(typeof banner!=='object') banner=[banner];

    var b=[];
    for(var i in banner){
      if(_banners[banner[i]]){b.push(_banners[banner[i]]);}
      else{b.push('<%= '+banner[i]+' %>');}
    }
    banner = b.join('\n');

    return {
      options: {
        position: 'top',
        replace: true,
        banner: banner
      },
      files: {
        src: src
      }
    };
  };

  _this = {

    setConfig: function(config){
      _config = config;
    },

    defineBanner: function(name,banner){
     _banners[name] = banner;
    },

    defineFiles: function(taskName,files){
      _files[taskName] = files;
    },

    getFiles: function(t){
      var f,i,ret=[];
      if(typeof t!=='object') t=[t];
      for(var j in t) {
        f=_files[t[j]];
        if(typeof f==='function') f=f();
        for(i=0;i<f.length;i++) ret.push(f[i]);
      }
      for(i=1;i<arguments.length;i++) ret.push(arguments[i]);
      return ret;
    },

    compilerFiles: function(dest,files){
      files=_this.getFiles(files);
      for(var i=2;i<arguments.length;i++) files.push(arguments[i]);
      var f={};
      f[_this.releaseBuild(dest)]=files;
      return f;
    },

    build: function(path,prefix){
      if(typeof path === 'object'){
        var paths = [];
        for(var i in path){paths.push(this.build(path[i],prefix));}
        return paths;
      }
      else if(typeof path === 'string'){
        return prefix+path;
      }
      return prefix;
    },

    releaseBuild: function(path){
      return this.build(path,'build/release/');
    },

    debugBuild: function(path){
      return this.build(path,'build/debug/');
    },

    registerConfig: function(taskid,actions){
      if(_config){
        for(var i in actions){
          if(!_config[i]) _config[i]={};
          _config[i][taskid]=actions[i];
        }
      }
    },

    registerTask: function(taskid,actions){
      var actlist=[];
      if(_config){
        for(var i in actions) {
          if(actions[i]!==true) {
            if(!_config[i]) _config[i]={};
            _config[i][taskid]=actions[i];
            actlist.push(i+':'+taskid);
          }
          else actlist.push(i);
        }
        grunt.registerTask(taskid,actlist);
      }
      return actlist;
    },

    debugBanner: function(src,banner){
      return _defaultBanner(src,true,banner);
    },

    releaseBanner: function (src,banner){
      return _defaultBanner(src,false,banner);
    }
  };

  return _this;
};