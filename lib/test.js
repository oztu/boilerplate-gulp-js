var istanbul = require('gulp-istanbul');
var jasmine = require('gulp-jasmine');

// Used to resolve: https://github.com/SBoudrias/gulp-istanbul/pull/55
var actualIstanbul = require('gulp-istanbul/node_modules/istanbul');

module.exports = function(gulp, config){
  return function test(done){
    gulp.src([config.sources, '!' + config.tests])
      .pipe(istanbul(config.istanbul))
      .pipe(istanbul.hookRequire())
      .on('finish', function() {
        gulp.src(config.tests)
          .pipe(jasmine().on('error', function(err){
            // keep until this lands: https://github.com/SBoudrias/gulp-istanbul/pull/55
            actualIstanbul.hook.unhookRequire();
            done(err);
          }))
          .pipe(istanbul.writeReports())
          .on('end', function(err){
            actualIstanbul.hook.unhookRequire();
            done(err);
          });
      });
  };
};
