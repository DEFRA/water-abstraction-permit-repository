const { test, experiment } = exports.lab = require('lab').script();
const { expect } = require('code');
const controller = require('../../../src/lib/controllers/status');

experiment('statusController', () => {
  experiment('getStatus', () => {
    test('returns an object with the application version', () => {
      const response = controller.getStatus();
      expect(response.version).to.match(/^\d*\.\d*.\d*$/);
    });
  });
});
