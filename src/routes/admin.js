/*

UI only - NO direct interactions with data

*/

const Admin= require('../lib/admin')


module.exports = [
  { method: 'GET', path: '/status', handler: function(request,reply){return reply('ok').code(200)}, config:{auth: false,description:'Get all entities'}},
  { method: 'GET', path: '/admin',  handler: Admin.index , config:{auth: 'simple',description:'Get Admin UI index'}},
  { method: 'GET', path: '/admin/permit',  handler: Admin.permitIndex , config:{auth: 'simple' ,description:'UI entry point for permit repo admin'}},
  { method: 'GET', path: '/admin/idm',  handler: Admin.idmIndex , config:{auth: 'simple' ,description:'UI entry point for IDM admin'}},
  { method: 'GET', path: '/admin/water',  handler: Admin.waterIndex , config:{auth: 'simple' ,description:'UI entry point for IDM admin'}},

  { method: 'GET', path: '/admin/findlicence',  handler: Admin.findlicence , config:{auth: 'simple',description:'Get Admin UI licence search'}},
  { method: 'GET', path: '/admin/findlicence/{search}',  handler: Admin.doFindlicence , config:{ auth: 'simple' ,description:'Perform admin UI licence search'}},
  { method: 'GET', path: '/admin/licence/{licence_id}',  handler: Admin.viewlicence , config:{auth: 'simple' ,description:'View licence by ID'}},
  { method: 'GET', path: '/admin/licence/{licence_id}/addshortcode',  handler: Admin.addShortcode , config:{auth: 'simple' ,description:'Add a shortcode to a licence'}},
  { method: 'GET', path: '/admin/fields',  handler: Admin.fields , config:{auth: 'simple' ,description:'View available system fields'}},
  { method: 'GET', path: '/admin/users',  handler: Admin.users , config:{auth: 'simple' ,description:'View users'}},
  { method: 'GET', path: '/admin/users/{user_id}',  handler: Admin.user , config:{auth: 'simple' ,description:'View user'}},
  { method: 'GET', path: '/admin/regime',  handler: Admin.regimes , config:{auth: 'simple' ,description:'View regimes'}},
  { method: 'GET', path: '/admin/regime/{regime_id}/licencetypes',  handler: Admin.regimeLicenceTypes, config:{auth: 'simple' ,description:'View licence types for regime '} },
  { method: 'GET', path: '/admin/regime/{regime_id}/licencetypes/{type_id}',  handler: Admin.regimeLicenceType , config:{auth: 'simple' ,description:'View specific licence type for regime '}},
  { method: 'POST', path:'/admin/regime/{regime_id}/licencetypes/{type_id}/field',  handler: Admin.addFieldToregimeLicenceType , config:{auth: 'simple' ,description:'Add field to licence type'}},
  { method: 'GET', path: '/admin/crm',  handler: Admin.crm , config:{auth: 'simple' ,description:'UI entry point for tactical crm'}},
  { method: 'GET', path: '/admin/crm/entities',  handler: Admin.crmEntities , config:{auth: 'simple' ,description:'Entity list for tactical crm'}},
  { method: 'GET', path: '/admin/crm/entities/newRegime',  handler: Admin.crmNewRegime , config:{auth: 'simple' ,description:'Create Regime form for tactical crm'}},
  { method: 'GET', path: '/admin/crm/entities/newCompany',  handler: Admin.crmNewCompany , config:{auth: 'simple' ,description:'Create Company form for tactical crm'}},
  { method: 'GET', path: '/admin/crm/entities/newIndividual',  handler: Admin.crmNewIndividual, config:{auth: 'simple' ,description:'Create individual form for tactical crm'} },
  { method: 'POST', path:'/admin/crm/entities/new',  handler: Admin.crmDoNewEntity , config:{auth: 'simple' ,description:'Create new entity in CRM'}},

  { method: 'POST', path:'/admin/crm/entities/associate',  handler: Admin.crmAssociateEntity , config:{auth: 'simple' ,description:'Create entity association in crm'}},
  { method: 'GET', path: '/admin/crm/entities/{entity_id}',  handler: Admin.crmEntity , config:{auth: 'simple' ,description:'Get specific entity in crm'}},
  { method: 'GET', path: '/admin/crm/allentities',  handler: Admin.crmAllEntitiesJSON, config:{auth: 'simple' ,description:'Get all entities in JSON from CRM'} }

]
