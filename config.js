const testMode = parseInt(process.env.TEST_MODE) === 1;
const isAcceptanceTestTarget = ['local', 'dev', 'development', 'test', 'preprod'].includes(process.env.NODE_ENV);

module.exports = {

  blipp: {
    showAuth: true
  },

  jwt: {
    key: process.env.JWT_SECRET,
    verifyOptions: { algorithms: ['HS256'] }
  },

  logger: {
    level: testMode ? 'info' : 'error',
    airbrakeKey: process.env.ERRBIT_KEY,
    airbrakeHost: process.env.ERRBIT_SERVER,
    airbrakeLevel: 'error'
  },

  pg: {
    connectionString: process.env.DATABASE_URL,
    max: process.env.NODE_ENV === 'local' ? 6 : 3,
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
};
