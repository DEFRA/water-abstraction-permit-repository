'use strict';

const version = '1.0';

const { pool } = require('../lib/connectors/db.js');

const { RegimeApi, LicenceTypeApi, LicenceApi } = require('../lib/controllers')({ pool, version });
const statusController = require('../lib/controllers/status');
const acceptanceTestsController = require('../lib/controllers/acceptance-tests');
const config = require('../../config');

const licenceRoutes = LicenceApi.getRoutes();
licenceRoutes[2].config.payload = { maxBytes: 10485760 };

const routes = [
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

if (config.isAcceptanceTestTarget) {
  routes.push({
    method: 'DELETE',
    path: `/API/${version}/acceptance-tests`,
    handler: acceptanceTestsController.deleteTestData,
    config: {
      description: 'Deletes the test permit data from acceptance testing'
    }
  });
}

module.exports = routes;
