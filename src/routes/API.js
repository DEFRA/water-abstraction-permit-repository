/*
API page, pending real back end - uses fs to read and write to lkocal json files...
*/

// const API = require('../lib/API');
const version = '1.0';

const { pool } = require('../lib/connectors/db.js');

const { RegimeApi, LicenceTypeApi, LicenceApi, LicenceExpiringApi } = require('../lib/controllers')({ pool, version });
const statusController = require('../lib/controllers/status');

const licenceRoutes = LicenceApi.getRoutes();
licenceRoutes[2].config.payload = { maxBytes: 10485760 };

module.exports = [
  {
    method: 'GET',
    path: '/status',
    handler: statusController.getStatus,
    config: { auth: false, description: 'Get all entities' }
  },
  ...RegimeApi.getRoutes(),
  ...LicenceTypeApi.getRoutes(),
  ...LicenceExpiringApi.getRoutes(),
  ...licenceRoutes
];
