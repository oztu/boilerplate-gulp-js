# Client-side JavaScript Module Builder

> Eliminates boilerplate required to test, lint, and build client-side CommonJS projects.

# Provided Tasks
```sh
# Builds, tests, lints, and minifies the module and puts in in the ./build folder.
gulp bpjs:build

# Incrementally builds, tests, and lints files as they're modified.
gulp bpjs:dev
```

# Use
Requires Gulp 4.0. Execute `npm install --save-dev gulp boilerplate-gulp-js`, then modify your `Gulpfile.js` like so (or create one):

```javascript
var gulp = require('gulp'),
  path= require('path'),
  bpjs = require('boilerplate-gulp-js');

bpjs(gulp, {
  // This will be used to name the built artifact (e.g., MyModule.js)
  name: 'MyModule',

  // The root of your CommonJS modules
  entry: path.join(__dirname, 'src/main.js'),

  // The sources for your project (used in linting and testing tasks)
  sources: path.join(__dirname, 'src/**/*.js'),

  // The tests for your project
  tests: path.join(__dirname, 'src/**/*Spec.js'),

  // The destination to write the built files
  dest: path.join(__dirname, 'build')
});

// Rest of your gulp file, potentially overwriting the boilerplate-gulp tasks...
```

# Capabilities
* Compiles JavaScript CommonJS modules into a single file ([browserify](http://browserify.org/)) which can be loaded directly in a browser, via CommonJS loader, or a AMD loader. Produces both an unminified version and a minified version with  source maps.
* Run unit tests ([jasmine](http://jasmine.github.io/2.0/introduction.html).
* Generates coverage reports ([istanbul](https://github.com/gotwarlost/istanbul)) for unit tests.
* Lints JS ([jshint](http://www.jshint.com/))
