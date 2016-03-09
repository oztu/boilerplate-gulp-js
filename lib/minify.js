var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var path = require('path');

module.exports = function(gulp, config) {
  var moduleFilePath = config.dest + '/' + config.name + '.js';

  return function minify(){
    return gulp.src(moduleFilePath)
      //.pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify(config.uglify))
      .pipe(rename(config.name + '.min.js'))
      //.pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.dest));
  };
};
