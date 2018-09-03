module.exports = {

  blipp: {
    showAuth: true
  },

  jwt: {
    key: process.env.JWT_SECRET,
    verifyOptions: { algorithms: [ 'HS256' ] }
  },

  logger: {
    level: 'info',
    airbrakeKey: process.env.errbit_key,
    airbrakeHost: process.env.errbit_server,
    airbrakeLevel: 'error'
  },

  pg: {
    connectionString: process.env.DATABASE_URL,
    max: 6,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  },

  server: {
    port: process.env.PORT,
    router: {
      stripTrailingSlash: true
    }
  }

};
