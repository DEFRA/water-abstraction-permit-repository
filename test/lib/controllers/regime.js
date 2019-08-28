const { experiment, test } = exports.lab = require('@hapi/lab').script();
const { expect } = require('@hapi/code');
const server = require('../../../index.js');

let regimeId;

experiment('Test POST regime creation', () => {
  test('The API should create a new regime with POST', async () => {
    const request = {
      method: 'POST',
      url: '/API/1.0/regime',
      payload: {
        regime_nm: 'Test regime'
      },
      headers: {
        Authorization: process.env.JWT_TOKEN
      }
    };

    const res = await server.inject(request);
    expect(res.statusCode).to.equal(201);

    // Check payload
    const payload = JSON.parse(res.payload);

    expect(payload.error).to.equal(null);
    expect(payload.data.regime_id).to.match(/^[0-9]+$/);

    regimeId = payload.data.regime_id;
  });

  test('The API should delete a regime with DELETE', async () => {
    const request = {
      method: 'DELETE',
      url: '/API/1.0/regime/' + regimeId,
      headers: {
        Authorization: process.env.JWT_TOKEN
      }
    };

    const res = await server.inject(request);
    expect(res.statusCode).to.equal(200);
  });
});
