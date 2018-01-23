/*
API page, pending real back end - uses fs to read and write to lkocal json files...

*/

const API = require('../lib/API')
const version = '1.0'

const {pool} = require('../lib/connectors/db.js');

const {RegimeApi, LicenceTypeApi, LicenceApi} = require('../lib/controllers')({pool, version});

// const RegimeApi = require('../lib/controllers/regime.js')({pool, version});
// const LicenceTypeApi = require('../lib/controllers/licence-type.js')({pool, version});
// const LicenceApi = require('../lib/controller')

module.exports = [
  { method: 'GET', path: '/status', handler: function(request,reply){return reply('ok').code(200)}, config:{auth: false,description:'Get all entities'}},
  { method: 'POST', path: '/API/' + version + '/regime/{regime_id}/licencetype/{type_id}/licence/{licence_id}/shortcode', handler: API.shortcode.create, config:{description:'TODO:'} },
  { method: 'POST', path: '/API/' + version + '/shortcode/{shortcode}', handler: API.shortcode.use, config:{description:'TODO:'} },
  { method: 'POST', path: '/API/' + version + '/token', config: { auth: false, description: 'Get JWT token' }, handler: API.system.getToken },
  { method: 'GET', path: '/API/' + version + '/field', handler: API.system.getFields , config:{description:'TODO:'}},



  ...RegimeApi.getRoutes(),
  ...LicenceTypeApi.getRoutes(),
  ...LicenceApi.getRoutes(),




  { method: 'GET', path: '/API/' + version + '/regime/{regime_id}/licencetype/{type_id}/field', handler: API.licencetype.getFields , config:{description:'TODO:'}},
  { method: 'POST', path: '/API/' + version + '/regime/{regime_id}/licencetype/{type_id}/field', handler: API.licencetype.createField , config:{description:'TODO:'}},



  // { method: 'GET', path: '/API/' + version + '/regime/{regime_id}/licencetype/{type_id}/licence', handler: API.licence.list , config:{description:'TODO:'}},
  // { method: 'POST', path: '/API/' + version + '/regime/{regime_id}/licencetype/{type_id}/licence', handler: API.licence.create , config:{description:'TODO:'}},
  // { method: 'GET', path: '/API/' + version + '/regime/{regime_id}/licencetype/{type_id}/licence/{licence_id}', handler: API.licence.get , config:{description:'TODO:'}},


  // { method: 'GET', path: '/API/' + version + '/licence/{licence_id}', handler: API.licence.get , config:{description:'TODO:'}},
{ method: 'GET', path: '/API/' + version + '/reset', handler: API.general.reset }
]
/**
{ method: 'GET', path: '/API/' + version + '/test', handler: test },
{ method: 'POST', path: '/API/' + version + '/licences', handler: licencesPostHandler },
{ method: 'GET', path: '/API/' + version + '/licences/{id}', handler: licenceGetHandler },
{ method: 'PUT', path: '/API/' + version + '/licences/{id}', handler: licencePutHandler  }

{ method: 'GET', path: '/API/' + version + '/orgs/{regime_id}/types/{type_id}/licences', handler: getLicencesByOrgandType },
{ method: 'GET', path: '/API/' + version + '/orgs/{regime_id}/types/{type_id}/licences/{licence_id}', handler: getLicenceByOrgTypeID },
{ method: 'POST', path: '/API/' + version + '/orgs/{regime_id}/types/{type_id}/licences', handler: addLicenceByOrgTypeID },

**/
