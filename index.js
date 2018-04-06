// provides permit API
require('dotenv').config();

const Hapi = require('hapi');

// create new server instance and connection information
const server = new Hapi.Server({
  port: process.env.PORT,
  router: {stripTrailingSlash: true}
});

// server.connection({ port: process.env.PORT || 8000 })

if (process.env.DATABASE_URL) {
  var workingVariable = process.env.DATABASE_URL.replace('postgres://', '');
  process.env.PGUSER = workingVariable.split('@')[0].split(':')[0];
  process.env.PGPASSWORD = workingVariable.split('@')[0].split(':')[1];
  process.env.PGHOST = workingVariable.split('@')[1].split(':')[0];
  process.env.PSPORT = workingVariable.split('@')[1].split(':')[1].split('/')[0];
  process.env.PGDATABASE = workingVariable.split('@')[1].split(':')[1].split('/')[1];
}

/**
 * Validate JWT token
 * @param {Object} decoded - decoded data from JWT
 * @param {Object} request - current request
 * @return {Object} - result
 */
async function validate (decoded, request) {
  if (!decoded.id) {
    console.log('boo... JWT failed');
    return { isValid: false };
  } else {
    console.log('huzah... JWT OK');
    return { isValid: true };
  }
}

/**
 * Async function to start HAPI server
 */
async function start () {
  // Node HAPI airbrake plugin
  await server.register({
    plugin: require('node-hapi-airbrake'),
    options: {
      key: process.env.errbit_key,
      host: process.env.errbit_server
    }
  });

  // Blipp - lists all routes
  await server.register({
    plugin: require('blipp'),
    options: {
      showAuth: true
    }
  });

  // JWT auth
  await server.register(require('hapi-auth-jwt2'));

  server.auth.strategy('jwt', 'jwt',
    { key: process.env.JWT_SECRET,
      validate
    });

  server.auth.default('jwt');

  // load routes
  server.route(require('./src/routes/API'));

  await server.start();

  console.log(`Server started on port ${process.env.PORT}`);

  return server;
}

start();

module.exports = server;
