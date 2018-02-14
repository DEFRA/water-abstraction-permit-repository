const HAPIRestAPI = require('hapi-pg-rest-api');
const Joi = require('joi');
const moment=require('moment')

module.exports = (config = {}) => {
  const {pool, version} = config;
  return new HAPIRestAPI({
    table : 'permit.view_expiring_licences',
    primaryKey : 'licence_id',
    endpoint : '/API/' + version + '/expiring_licences',
    connection : pool,
        postSelect : (data) => {
          const numMonths=4
          return data.filter((obj)=> {
            return obj.licence_end_dt, moment(obj.licence_end_dt).diff(moment(), 'months') < numMonths ;
          });
        },
    validation : {
      licence_id : Joi.number(),
      licence_ref : Joi.string(),
      licence_type_id : Joi.number(),
      licence_regime_id : Joi.number(),
      filter:Joi.object(),
      sort:Joi.object(),
      pagination:Joi.object(),
    }
  });
}
