var del = require('del'),
  git = require('gulp-git');

module.exports = function(gulp, config) {
  return function cloneBowerPackage(done){
    if(!config.bowerPackageRepo) return cb();
    del([config.bowerPackageRepoDir], function(err){
      git.clone(config.bowerPackageRepo, {
        args: config.bowerPackageRepoDir
      }, function(){
        del([
          config.bowerPackageRepoDir + '/**/*',
          '!' + config.bowerPackageRepoDir + '/bower.json'
        ], function(err){
          if(err) throw err;
          cb();
        });
      });
    });
  };
};
