/*
Tactical route to provide:

placeholder for IDM
  - login with username and password, returning
    - user infomation (ultimately to be replaced by verify)
placeholder for CRM
  - request licence headers for specified user (ultimately to be replaced by dynamics)
*/

const Tactical= require('../lib/tactical')
const version = '1.0'




module.exports = [
  { method: 'GET', path: '/status', handler: function(request,reply){return reply('ok').code(200)}, config:{auth: false,description:'Get all entities'}},
  { method: 'POST', path: '/API/' + version + '/tactical/user/login',  config:{ auth: false,description:'TODO:' }, handler: Tactical.IDM.getUser },
  { method: 'POST', path: '/API/' + version + '/tactical/user/licences',  config:{ auth: false,description:'TODO:' }, handler: Tactical.CRM.getUserLicences },
  { method: 'GET', path: '/logout',  config:{description:'TODO:' }, handler: function(request,reply){reply('You are logged out now').code(401)} },
  { method: 'GET', path: '/searchKeys',  config:{ auth: false ,description:'TODO:'}, handler: Tactical.generateSearchKeys }
]
