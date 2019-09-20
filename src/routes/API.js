/*
API page, pending real back end - uses fs to read and write to lkocal json files...
*/

const version = '1.0';

const { pool } = require('../lib/connectors/db.js');

const { RegimeApi, LicenceTypeApi, LicenceApi } = require('../lib/controllers')({ pool, version });
const statusController = require('../lib/controllers/status');

const licenceRoutes = LicenceApi.getRoutes();
licenceRoutes[2].config.payload = { maxBytes: 10485760 };

module.exports = [
  {
    method: 'GET',
    path: '/status',
    handler: statusController.getStatus,
    config: {
      auth: false,
      description: 'Healthcheck endpoint for the load balancer to inspect'
    }
  },
  ...RegimeApi.getRoutes(),
  ...LicenceTypeApi.getRoutes(),
  ...licenceRoutes
];
