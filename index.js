// provides permit API
require('dotenv').config();
const config = require('./config');

const Hapi = require('hapi');

// create new server instance and connection information
const server = new Hapi.Server(config.server);

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
    options: config.blipp
  });

  // JWT auth
  await server.register(require('hapi-auth-jwt2'));

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET,
    validate
  });

  server.auth.default('jwt');

  // load routes
  server.route(require('./src/routes/API'));

  if (!module.parent) {
    await server.start();
    console.log(`Server started on port ${process.env.PORT}`);
  }

  return server;
}

start();

module.exports = server;
