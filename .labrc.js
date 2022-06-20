'use strict'
// default settings for lab test runs.
//
// This is overridden if arguments are passed to lab via the command line.
module.exports = {
  verbose: true,
  coverage: true,
  // lcov reporter required for SonarCloud
  reporter: ['console', 'html', 'lcov'],
  output: ['stdout', 'coverage/coverage.html', 'coverage/lcov.info'],
  globals: ['fetch','Response','Headers','Request'].join(',')
};
