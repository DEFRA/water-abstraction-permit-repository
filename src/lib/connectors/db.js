const { pg } = require('../../../config');
const { Pool } = require('pg');
const { logger } = require('../../logger');

const pool = new Pool(pg);

pool.on('acquire', () => {
  const { totalCount, idleCount, waitingCount } = pool;
  if (totalCount === pg.max && idleCount === 0 && waitingCount > 0) {
    logger.info(`Pool low on connections::Total:${totalCount},Idle:${idleCount},Waiting:${waitingCount}`);
  }
});

exports.pool = pool;
