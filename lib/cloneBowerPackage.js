const del = require('del');
const git = require('gulp-git');

module.exports = function(gulp, config) {
  return function cloneBowerPackage(done) {
    if(!config.bowerPackageRepo) return done();

    del([config.bowerPackageRepoDir])
      .then(paths => {
        git.clone(config.bowerPackageRepo, { args: config.bowerPackageRepoDir },
          () => { //handle err
            const paths = [
              config.bowerPackageRepoDir + '/**/*',
              '!' + config.bowerPackageRepoDir + '/bower.json'
            ];

            del(paths)
              .then(paths => done())
              .catch(err => {
                throw err;
              });
          }
        );
      })
      .catch(err => {
        throw err;
      });
  };
};
