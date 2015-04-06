var path = require('path');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

module.exports = function(gulp, config){
  return function bundle(){
    return browserify({
        entries: config.entry,
        debug: true,
        standalone: config.name
      })
      .bundle()
      .pipe(source(config.name)) // gulpifies the browserify stream
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true, debug: true}))
      .pipe(rename(config.name + '.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.dest));
  };
};
