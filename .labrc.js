// default settings for lab test runs.
//
// This is overridden if arguments are passed to lab via the command line.
module.exports = {
  globals: 'fetch,Response,Headers,Request',
  verbose: true,
  'coverage-exclude': [
    'migrations',
    'node_modules',
    'scripts',
    'src/lib/logger/vendor',
    'test'
  ]
};
