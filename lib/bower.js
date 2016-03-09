
  //*******************************//
  // Bower package repo management //
  //*******************************//

  function execInBowerPackageRepoDir(cmd, cb){
    exec(cmd, {cwd: bowerPackageRepoDir}, function(err, stdout, stderr){
      if(err) console.error(err, stderr);
      console.log(stdout);
      cb(err);
    });
  }

  function pushRelease(pkg, commitMsg, cb){
    execInBowerPackageRepoDir('git add -A', function(err){
      if(err) return cb();

      execInBowerPackageRepoDir('git commit -a -m "'+ commitMsg + '"', function(err){
        if(err) return cb();

        execInBowerPackageRepoDir('git tag v'+ pkg.version, function(err){
          if(err) return cb();

          execInBowerPackageRepoDir('git push --tags origin master', cb);
        });
      });
    });
  }

  gulp.task('publish-release', ['generate-bower-package'], function(cb){
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
  });
