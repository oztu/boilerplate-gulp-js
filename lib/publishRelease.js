var fs = require('fs'),
  semver = require('semver'),
  gitrev = require('git-rev'),
  pushRelease = require('./pushRelease');

module.exports = function(gulp, config) {
  var pkg = config.pkg;

  return gulp.series(
    'bpjs:generate-bower-package',
    function publishRelease(done) {
      gitrev.short(function(sha){
        // If the package repo dir has a bower.json use it for the version
        if(fs.existsSync(bowerPackageRepoDir + '/bower.json')){
          var innerVersion = JSON.parse(fs.readFileSync(bowerPackageRepoDir + '/bower.json')).version;
          if(!semver.gt(pkg.version, innerVersion)){
            console.log(pkg.version + ' is less than ' + innerVersion + '! Refusing release.');
            return;
          }
        }

        var pkgString = JSON.stringify(pkg, null, 4);
        fs.writeFileSync(bowerPackageRepoDir + '/bower.json', pkgString);

        var commitMsg = 'Release: v' + pkg.version + ' at rev ' + sha;

        pushRelease(pkg, commitMsg, cb);
      });
    }
  );
};
