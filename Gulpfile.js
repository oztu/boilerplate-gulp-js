var path = require('path');
var gulp = require('gulp');
var boilerplate = require('./main');

boilerplate(gulp, {
  entry: path.join(__dirname, '/example/main.js'),
  sources: path.join(__dirname + '/example/**/*.js'),
  tests: path.join(__dirname + '/example/**/*Spec.js')
});
