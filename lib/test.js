var istanbul = require('gulp-istanbul');
var jasmine = require('gulp-jasmine');

module.exports = function(gulp, config){
  return function test(done){
    gulp.src([config.sources, '!' + config.tests])
      .pipe(istanbul(config.istanbul))
      .pipe(istanbul.hookRequire())
      .on('finish', function() {
        gulp.src(config.tests)
          .pipe(jasmine().on('error', function(err){
            done(err);
          }))
          .pipe(istanbul.writeReports())
          .on('end', function(err){
            done(err);
          });
      });
  };
};
