module.exports = function(gulp, config) {
  if(!config.bowerPackageRepo) return function(){};

  return gulp.series(
    'bpjs:build',
    'bpjs:clone-bower-package',
    function generateBowerPackage() {
      return gulp.src([config.dest + '/**/*'])
        .pipe(gulp.dest(config.bowerPackageRepoDir + '/dist'));
    }
  );
};
