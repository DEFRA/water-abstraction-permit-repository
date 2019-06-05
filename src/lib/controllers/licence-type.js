const HAPIRestAPI = require('hapi-pg-rest-api');
const Joi = require('joi');

module.exports = (config = {}) => {
  const { pool, version } = config;
  return new HAPIRestAPI({
    table: 'permit.type',
    primaryKey: 'type_id',
    endpoint: '/API/' + version + '/licencetype',
    connection: pool,
    primaryKeyAuto: true,
    primaryKeyGuid: false,
    validation: {
      type_id: Joi.number(),
      type_nm: Joi.string(),
      regime_id: Joi.number()
    }
  });
};
