var fs = require('fs'),
  exec = require('child_process').exec;

function execInBowerPackageRepoDir(cmd, done){
  exec(cmd, {cwd: bowerPackageRepoDir}, function(err, stdout, stderr){
    if(err) console.error(err, stderr);
    console.log(stdout);
    done(err);
  });
}

module.exports = function pushRelease(pkg, commitMsg, done){
  execInBowerPackageRepoDir('git add -A', function(err){
    if(err) return done();

    execInBowerPackageRepoDir('git commit -a -m "'+ commitMsg + '"', function(err){
      if(err) return done();

      execInBowerPackageRepoDir('git tag v'+ pkg.version, function(err){
        if(err) return done();

        execInBowerPackageRepoDir('git push --tags origin master', done);
      });
    });
  });
}
