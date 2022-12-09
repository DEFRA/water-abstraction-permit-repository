// provides permit API
require('dotenv').config()
const config = require('./config')

const Hapi = require('@hapi/hapi')

// create new server instance and connection information
const server = new Hapi.Server(config.server)
const db = require('./src/lib/connectors/db')

const HapiPinoPlugin = require('./src/plugins/hapi-pino.plugin.js')

// Initialise logger
const { logger } = require('./src/logger')

/**
 * Validate JWT token
 * @param {Object} decoded - decoded data from JWT
 * @param {Object} request - current request
 * @return {Object} - result
 */
async function validate (decoded, request) {
  if (!decoded.id) {
    server.log(['info'], 'JWT failed')
    return { isValid: false }
  }
  return { isValid: true }
}

/**
 * Async function to start HAPI server
 */
async function start () {
  await server.register(HapiPinoPlugin())

  // Blipp - lists all routes
  await server.register({
    plugin: require('blipp'),
    options: config.blipp
  })

  // JWT auth
  await server.register(require('hapi-auth-jwt2'))

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET,
    validate
  })

  server.auth.default('jwt')

  // load routes
  server.route(require('./src/routes/API'))

  if (!module.parent) {
    await server.start()
    server.log(['info'], `Server started on port ${config.server.port}`)
  }

  return server
}

const processError = message => err => {
  logger.error(message, err.stack)
  process.exit(1)
}

process
  .on('unhandledRejection', processError('unhandledRejection'))
  .on('uncaughtException', processError('uncaughtException'))
  .on('SIGINT', async () => {
    logger.info('Stopping permit repo')

    await server.stop()
    logger.info('1/2: Hapi server stopped')

    await db.pool.end()
    logger.info('2/2: Connection pool closed')

    return process.exit(0)
  })

start()

module.exports = server
