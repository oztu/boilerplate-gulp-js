var jshint = require('gulp-jshint');
var jsStylish = require('jshint-stylish');

module.exports = function(gulp, config) {
  return function lint(){
    return gulp.src([
        config.sources,
        config.tests
      ])
      .pipe(jshint(config.jsHint))
      .pipe(jshint.reporter(jsStylish));
  };
};
