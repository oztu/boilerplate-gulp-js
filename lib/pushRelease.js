var fs = require('fs'),
  exec = require('child_process').exec;

function execInBowerPackageRepoDir(cwd, cmd, done){
  exec(cmd, {cwd: cwd}, function(err, stdout, stderr){
    if(err) console.error(err, stderr);
    console.log(stdout);
    done(err);
  });
}

module.exports = function pushRelease(bowerPackageRepoDir, pkg, commitMsg, done){
  execInBowerPackageRepoDir(bowerPackageRepoDir, 'git add -A', function(err){
    if(err) return done();

    execInBowerPackageRepoDir(bowerPackageRepoDir, 'git commit -a -m "'+ commitMsg + '"', function(err){
      if(err) return done();

      execInBowerPackageRepoDir(bowerPackageRepoDir, 'git tag v'+ pkg.version, function(err){
        if(err) return done();

        execInBowerPackageRepoDir(bowerPackageRepoDir, 'git push --tags origin master', done);
      });
    });
  });
}
