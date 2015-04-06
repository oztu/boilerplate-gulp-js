var path = require('path');
var fs = require('fs');

module.exports = function(gulp, config){
  //***************//
  // Configuration //
  //***************//
  config = config || {};

  var DEFAULTS = {
    entry: './lib/main.js',
    sources: './lib/**/*.js',
    tests: './lib/**/*Spec.js',
    dest: './build',
    
    jsHint: require('./jsHintConfig.js'),
    uglify: {},
    istanbul: {}
  };

  // Populate options with defaults if it doesn't contain them
  Object.keys(DEFAULTS).forEach(function(key){
    if(!(key in config)) config[key] = DEFAULTS[key];
  });

  // If an explicit name isn't set, use the name of the entry file
  if(!('name' in config)) config.name = path.basename(config.entry, '.js');


  //***************//
  //     Tasks     //
  //***************//
  gulp.task('bpjs:bundle', require('./lib/bundle')(gulp, config));
  gulp.task('bpjs:clean', require('./lib/clean')(gulp, config));
  gulp.task('bpjs:lint', require('./lib/lint')(gulp, config));
  gulp.task('bpjs:minify', require('./lib/minify')(gulp, config));
  gulp.task('bpjs:test', require('./lib/test')(gulp, config));
  gulp.task('bpjs:watch', function watch(){
    gulp.watch(config.sources, gulp.parallel(
      'bpjs:test',
      'bpjs:lint',
      'bpjs:bundle'
    ));
  });

  //***************//
  //  Dependencies //
  //***************//
  gulp.task('bpjs:build', gulp.parallel(
    'bpjs:test',
    'bpjs:lint',
    gulp.series(
      'bpjs:clean',
      'bpjs:bundle',
      'bpjs:minify'
    )
  ));

  gulp.task('bpjs:dev', gulp.parallel('bpjs:build', 'bpjs:watch'));
};
