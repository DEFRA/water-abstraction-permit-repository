const HAPIRestAPI = require('hapi-pg-rest-api');
const Joi = require('joi');
const {reduceGridReferenceResolution} = require('../helpers.js');
const deepMap = require('deep-map');

module.exports = (config = {}) => {
  const {pool, version} = config;
  return new HAPIRestAPI({
    table : 'permit.licence',
    primaryKey : 'licence_id',
    endpoint : '/API/' + version + '/licence',
    connection : pool,
    primaryKeyAuto : true,
    primaryKeyGuid : false,

    postSelect : (data) => {
      // @TODO filter out grid refs when licence data added with deep-map
      return deepMap(data, (val) => {
        return typeof(val) === 'string' ? reduceGridReferenceResolution(val) : val;
      });
    },

    validation : {
      licence_status_id : Joi.number(),
      licence_type_id : Joi.number(),
      licence_regime_id : Joi.number(),
      licence_id : Joi.number(),
      licence_search_key : Joi.string(),
      is_public_domain : Joi.number(),
      licence_start_dt: Joi.string(),
      licence_end_dt: Joi.string(),
      licence_ref: Joi.string()
    }
  });
}
