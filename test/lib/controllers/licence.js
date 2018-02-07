const Lab = require('lab');

const lab = Lab.script();
const Code = require('code');
const server = require('../../../index.js');

let regimeId, licenceId;


lab.experiment('Test POST licence creation', () => {


  // Create regime for testing
  lab.before(async () => {
    const request = {
      method: 'POST',
      url: '/API/1.0/regime',
      payload: {
        regime_nm: 'Test regime'
      },
      headers: {
        Authorization : process.env.JWT_TOKEN
      }
    };

    const res = await server.inject(request);

    // Check payload
    const payload = JSON.parse(res.payload);
    regimeId = payload.data.regime_id;
  });

  // Tear down regime
  lab.after(async () => {
    const request = {
      method: 'DELETE',
      url: '/API/1.0/regime/' + regimeId,
      headers: {
        Authorization : process.env.JWT_TOKEN
      }
    };

    const res = await server.inject(request);
    Code.expect(res.statusCode).to.equal(200);

  });



  lab.test('The API should create a new licence with POST', async () => {
    const request = {
      method: 'POST',
      url: '/API/1.0/licence',
      payload: {
        "licence_regime_id": regimeId,
        "licence_status_id": 1,
        "licence_type_id": 999999999999,
        "licence_ref": "00/11/22/33/44",
        "licence_data_value": "{}"
      },
      headers: {
        Authorization : process.env.JWT_TOKEN
      }
    };

    const res = await server.inject(request);
    Code.expect(res.statusCode).to.equal(201);

    // Check payload
    const payload = JSON.parse(res.payload);

    Code.expect(payload.error).to.equal(null);
    Code.expect(payload.data.licence_id).to.match(/^[0-9]+$/);

    licenceId = payload.data.licence_id;
  });

  lab.test('The API should delete a licence with DELETE', async () => {
    const request = {
      method: 'DELETE',
      url: '/API/1.0/licence/' + licenceId,
      headers: {
        Authorization : process.env.JWT_TOKEN
      }
    };

    const res = await server.inject(request);
    Code.expect(res.statusCode).to.equal(200);

  });



});

exports.lab = lab;
