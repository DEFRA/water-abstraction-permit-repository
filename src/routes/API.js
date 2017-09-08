/*
API page, pending real back end - uses fs to read and write to lkocal json files...

*/

const API = require('../lib/API')
const version = '1.0'

module.exports = [

  { method: 'POST', path: '/API/' + version + '/org/{org_id}/licencetype/{type_id}/licence/{licence_id}/shortcode', handler: API.shortcode.create },
  { method: 'PUT', path: '/API/' + version + '/shortcode/{shortcode}', handler: API.shortcode.use },
  { method: 'POST', path: '/API/' + version + '/token', config: { auth: false }, handler: API.system.getToken },
  { method: 'GET', path: '/API/' + version + '/field', handler: API.system.getFields },
  { method: 'GET', path: '/API/' + version + '/org', handler: API.org.list },
  { method: 'POST', path: '/API/' + version + '/org', handler: API.org.create },
  { method: 'DELETE', path: '/API/' + version + '/org/{org_id}', handler: API.org.delete },
  { method: 'GET', path: '/API/' + version + '/org/{org_id}', handler: API.org.get },
  { method: 'PUT', path: '/API/' + version + '/org/{org_id}', handler: API.org.update },
  { method: 'POST', path: '/API/' + version + '/org/{org_id}/licencetype', handler: API.licencetype.create },
  { method: 'GET', path: '/API/' + version + '/org/{org_id}/licencetype', handler: API.licencetype.list },
  { method: 'GET', path: '/API/' + version + '/org/{org_id}/licencetype/{type_id}', handler: API.licencetype.get },
  { method: 'GET', path: '/API/' + version + '/org/{org_id}/licencetype/{type_id}/field', handler: API.licencetype.getFields },
  { method: 'POST', path: '/API/' + version + '/org/{org_id}/licencetype/{type_id}/field', handler: API.licencetype.createField },
  { method: 'GET', path: '/API/' + version + '/org/{org_id}/licencetype/{type_id}/licence', handler: API.licence.list },
  { method: 'POST', path: '/API/' + version + '/org/{org_id}/licencetype/{type_id}/licence', handler: API.licence.create },
  { method: 'GET', path: '/API/' + version + '/org/{org_id}/licencetype/{type_id}/licence/{licence_id}', handler: API.licence.get },
  { method: 'PUT', path: '/API/' + version + '/org/{org_id}/licencetype/{type_id}/licence/{licence_id}', handler: API.licence.update },
{ method: 'GET', path: '/API/' + version + '/reset', handler: API.general.reset }
]
/**
{ method: 'GET', path: '/API/' + version + '/test', handler: test },
{ method: 'POST', path: '/API/' + version + '/licences', handler: licencesPostHandler },
{ method: 'GET', path: '/API/' + version + '/licences/{id}', handler: licenceGetHandler },
{ method: 'PUT', path: '/API/' + version + '/licences/{id}', handler: licencePutHandler  }

{ method: 'GET', path: '/API/' + version + '/orgs/{org_id}/types/{type_id}/licences', handler: getLicencesByOrgandType },
{ method: 'GET', path: '/API/' + version + '/orgs/{org_id}/types/{type_id}/licences/{licence_id}', handler: getLicenceByOrgTypeID },
{ method: 'POST', path: '/API/' + version + '/orgs/{org_id}/types/{type_id}/licences', handler: addLicenceByOrgTypeID },

**/
