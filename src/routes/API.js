/*
API page, pending real back end - uses fs to read and write to lkocal json files...
*/

const API = require('../lib/API');
const version = '1.0';

const {pool} = require('../lib/connectors/db.js');

const {RegimeApi, LicenceTypeApi, LicenceApi, LicenceExpiringApi} = require('../lib/controllers')({pool, version});

var licenceRoutes = LicenceApi.getRoutes();
licenceRoutes[2].config.payload = {maxBytes: 10485760};

module.exports = [
  { method: 'GET', path: '/status', handler: function (request, h) { return h.response('ok').code(200); }, config: {auth: false, description: 'Get all entities'} },
  { method: 'POST', path: '/API/' + version + '/token', config: { auth: false, description: 'Get JWT token' }, handler: API.system.getToken },
  ...RegimeApi.getRoutes(),
  ...LicenceTypeApi.getRoutes(),
  ...LicenceExpiringApi.getRoutes(),
  ...licenceRoutes,
  { method: 'GET', path: '/API/' + version + '/reset', handler: API.general.reset }
];
