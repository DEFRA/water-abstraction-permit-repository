// provides permit API
require('dotenv').config();
const config = require('./config');
const Good = require('good');
const GoodWinston = require('good-winston');

const Hapi = require('@hapi/hapi');

// create new server instance and connection information
const server = new Hapi.Server(config.server);

// Initialise logger
const { logger } = require('./src/logger');
const goodWinstonStream = new GoodWinston({ winston: logger });

/**
 * Validate JWT token
 * @param {Object} decoded - decoded data from JWT
 * @param {Object} request - current request
 * @return {Object} - result
 */
async function validate (decoded, request) {
  if (!decoded.id) {
    server.log(['info'], 'JWT failed');
    return { isValid: false };
  }
  return { isValid: true };
}

/**
 * Async function to start HAPI server
 */
async function start () {
  await server.register({
    plugin: Good,
    options: { ...config.good,
      reporters: {
        winston: [goodWinstonStream]
      }
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
    server.log(['info'], `Server started on port ${config.server.port}`);
  }

  return server;
}

process.on('unhandledRejection', (err) => {
  logger.error(err);
  process.exit(1);
});

start();

module.exports = server;
