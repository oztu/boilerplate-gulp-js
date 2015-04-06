var del = require('del');

module.exports = function(gulp, config){
  return function clean(done){
    del(config.dest, done);
  };
};
