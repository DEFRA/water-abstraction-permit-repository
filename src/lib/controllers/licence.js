const HAPIRestAPI = require('hapi-pg-rest-api');
const Joi = require('joi');
const { reduceGridReferenceResolution, isWaterAbstractionLicence } = require('../helpers.js');
const deepMap = require('deep-map');

/**
 * Post select handler automatically searches for and reduces the resolution
 * of NGR grid references down to 6 figures
 * @param  {Array} data - rows from licences table
 * @return {Array}      - rows with licence_data_value NGRs reduced in resolution
 */
const postSelect = (data) => {
  return data.map(row => {
    if (!isWaterAbstractionLicence(row)) {
      return row;
    }

    const { licence_data_value: licenceDataValue, ...rest } = row;

    // Filter out grid refs when licence data added with deep-map
    const filtered = deepMap(licenceDataValue, (val) => {
      return typeof (val) === 'string' ? reduceGridReferenceResolution(val) : val;
    });

    return { licence_data_value: filtered, ...rest };
  });
};

module.exports = (config = {}) => {
  const { pool, version } = config;
  return new HAPIRestAPI({
    table: 'permit.licence',
    primaryKey: 'licence_id',
    endpoint: '/API/' + version + '/licence',
    connection: pool,
    primaryKeyAuto: true,
    primaryKeyGuid: false,
    upsert: {
      fields: ['licence_regime_id', 'licence_type_id', 'licence_ref'],
      set: ['licence_status_id', 'licence_search_key', 'is_public_domain', 'licence_start_dt', 'licence_end_dt', 'licence_data_value']
    },
    postSelect,
    validation: {
      licence_status_id: Joi.number(),
      licence_type_id: Joi.number(),
      licence_regime_id: Joi.number(),
      licence_id: Joi.number(),
      licence_search_key: Joi.string(),
      is_public_domain: Joi.number(),
      licence_start_dt: Joi.string(),
      licence_end_dt: Joi.string(),
      licence_ref: Joi.string(),
      licence_data_value: Joi.string(),
      metadata: Joi.string()
    }
  });
};

module.exports.postSelect = postSelect;
