const environment = process.env.ENVIRONMENT
const isProduction = environment === 'prd'

module.exports = {

  blipp: {
    showAuth: true
  },

  jwt: {
    key: process.env.JWT_SECRET,
    verifyOptions: { algorithms: ['HS256'] }
  },

  logger: {
    level: process.env.WRLS_LOG_LEVEL || 'info',
    airbrakeKey: process.env.ERRBIT_KEY,
    airbrakeHost: process.env.ERRBIT_SERVER,
    airbrakeLevel: 'error'
  },

  pg: {
    connectionString: process.env.DATABASE_URL,
    max: 6,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000
  },

  server: {
    port: 8004,
    router: {
      stripTrailingSlash: true
    }
  },

  licence: {
    regimeId: 1,
    typeId: 8
  },

  isProduction
}
