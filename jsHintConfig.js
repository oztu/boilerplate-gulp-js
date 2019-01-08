// Modified from the Airbnb JS Styleguide
module.exports = {
  /*
   * ENVIRONMENTS
   * =================
   */

  // Define globals exposed by modern browsers.
  browser: true,

  // Define globals exposed by Node.js.
  node: true,

  // Define global ECMAScript version
  esversion: 6,

  /*
   * ENFORCING OPTIONS
   * =================
   */

  // Prohibit use of == and != in favor of === and !==.
  eqeqeq: true,

  // Enforce tab width of 2 spaces.
  indent: 2,

  // Require capitalized names for constructor functions.
  newcap: true,

  // Prohibit trailing whitespace.
  trailing: true,

  // Force all variable names to use either camelCase style or UPPER_CASE
  // with underscores.
  camelcase: true,

  // Enforce use of single quotation marks for strings.
  quotmark: 'single',

  // Prohibit use of explicitly undeclared variables.
  undef: true,

  // Warn when variables are defined but never used.
  unused: true,

  // Enforce line length to 120 characters
  maxlen: 120,


  /*
   * RELAXING OPTIONS
   * ================
   */
  // Prohibit use of a variable before it is defined.
  latedef: false,

  // Suppress warnings about == null comparisons.
  eqnull: true,

  globals: {
    // Jasmine Globals
    jasmine: true,
    beforeEach: true,
    afterEach: true,
    describe: true,
    expect: true,
    it: true,
    spyOn: true,
    xdescribe: true,
    xit: true
  }
};
