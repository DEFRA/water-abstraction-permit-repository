const HAPIRestAPI = require('hapi-pg-rest-api');
const Joi = require('joi');

module.exports = (config = {}) => {
  const { pool, version } = config;
  return new HAPIRestAPI({
    table: 'permit.regime',
    primaryKey: 'regime_id',
    endpoint: '/API/' + version + '/regime',
    connection: pool,
    primaryKeyAuto: true,
    primaryKeyGuid: false,
    validation: {
      regime_nm: Joi.string(),
      regime_id: Joi.number()
    }
  });
};
