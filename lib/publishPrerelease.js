var fs = require('fs'),
  semver = require('semver'),
  gitrev = require('git-rev'),
  pushRelease = require('./pushRelease');

module.exports = function(gulp, config) {
  var pkg = config.pkg;

  return gulp.series(
    'bpjs:generate-bower-package',
    function publishPrerelease(done) {
      gitrev.short(function(sha){
        // If the package repo dir has a bower.json use it for the version
        if(fs.existsSync(config.bowerPackageRepoDir + '/bower.json')){
          var innerVersion = JSON.parse(fs.readFileSync(config.bowerPackageRepoDir + '/bower.json')).version;
          // If the parent version isn't greater than the released package, then use the
          // released package version to enable incrementing build counts.
          if(semver.gte(innerVersion, pkg.version + '-build.0')){
            pkg.version = innerVersion;
          }
        }

        var version = pkg.version;
        if(version.indexOf('-') === -1) {
          version = semver.inc(version, 'patch');
          version += '-build.0';
        } else {
          version = semver.inc(version, 'prerelease');
        }

        version += '+sha.' + sha;

        pkg.version = version;

        var pkgString = JSON.stringify(pkg, null, 4);
        fs.writeFileSync(config.bowerPackageRepoDir + '/bower.json', pkgString);

        var commitMsg = 'Prerelease: v' + pkg.version;
        pushRelease(config.bowerPackageRepoDir, pkg, commitMsg, done);
      });
    }
  );
};
