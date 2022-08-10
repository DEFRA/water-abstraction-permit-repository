const isAcceptanceTestTarget = ['local', 'dev', 'development', 'test', 'qa', 'preprod'].includes(process.env.NODE_ENV)

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
    max: process.env.NODE_ENV === 'local' ? 16 : 6,
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

  isAcceptanceTestTarget
}
