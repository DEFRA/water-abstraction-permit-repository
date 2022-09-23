const {
  experiment,
  test,
  before,
  after
} = exports.lab = require('@hapi/lab').script()
const { expect } = require('@hapi/code')
const server = require('../../../index.js')

let regimeId, licenceId

const { postSelect } = require('../../../src/lib/controllers/licence.js')

experiment('Test POST licence creation', () => {
  // Create regime for testing
  before(async () => {
    const request = {
      method: 'POST',
      url: '/API/1.0/regime',
      payload: {
        regime_nm: 'Test regime'
      },
      headers: {
        Authorization: process.env.JWT_TOKEN
      }
    }

    const res = await server.inject(request)

    // Check payload
    const payload = JSON.parse(res.payload)
    regimeId = payload.data.regime_id
  })

  // Tear down regime
  after(async () => {
    const request = {
      method: 'DELETE',
      url: '/API/1.0/regime/' + regimeId,
      headers: {
        Authorization: process.env.JWT_TOKEN
      }
    }

    const res = await server.inject(request)
    expect(res.statusCode).to.equal(200)
  })

  // Create regime for testing
  test('The API should reject requests without authorization header', async () => {
    const request = {
      method: 'GET',
      url: '/API/1.0/regime',
      payload: {
        regime_nm: 'Test regime'
      }
    }

    const res = await server.inject(request)

    expect(res.statusCode).to.equal(401)
  })

  test('The API should create a new licence with POST', async () => {
    const request = {
      method: 'POST',
      url: '/API/1.0/licence',
      payload: {
        licence_regime_id: regimeId,
        licence_status_id: 1,
        licence_type_id: 999999999999,
        licence_ref: '00/11/22/33/44',
        licence_data_value: '{}'
      },
      headers: {
        Authorization: process.env.JWT_TOKEN
      }
    }

    const res = await server.inject(request)
    expect(res.statusCode).to.equal(201)

    // Check payload
    const payload = JSON.parse(res.payload)

    expect(payload.error).to.equal(null)
    expect(payload.data.licence_id).to.match(/^[0-9]+$/)

    licenceId = payload.data.licence_id
  })

  test('The API should delete a licence with DELETE', async () => {
    const request = {
      method: 'DELETE',
      url: '/API/1.0/licence/' + licenceId,
      headers: {
        Authorization: process.env.JWT_TOKEN
      }
    }

    const res = await server.inject(request)
    expect(res.statusCode).to.equal(200)
  })
})

experiment('Test postSelect hook', () => {
  const createData = (ngr, typeId = 8) => {
    return [{
      licence_regime_id: 1,
      licence_type_id: typeId,
      licence_data_value: `{ "key" : "Some text here with ${ngr} value" }`
    }]
  }

  test('It should filter NGRs with spaces in licence_data_value', async () => {
    const data = createData('SP 12345 67890')
    const result = postSelect(data)
    expect(result[0].licence_data_value).to.equal('{ "key" : "Some text here with SP 123 678 value" }')
  })

  test('It should filter NGRs without spaces in licence_data_value', async () => {
    const data = createData('SP1234567890')
    const result = postSelect(data)
    expect(result[0].licence_data_value).to.equal('{ "key" : "Some text here with SP 123 678 value" }')
  })

  test('It should filter NGRs with initial space licence_data_value', async () => {
    const data = createData('SP 1234567890')
    const result = postSelect(data)
    expect(result[0].licence_data_value).to.equal('{ "key" : "Some text here with SP 123 678 value" }')
  })

  test('It should filter NGRs with second space licence_data_value', async () => {
    const data = createData('SP12345 67890')
    const result = postSelect(data)
    expect(result[0].licence_data_value).to.equal('{ "key" : "Some text here with SP 123 678 value" }')
  })

  test('It should not filter NGRs for non-abstraction licence types', async () => {
    const data = createData('SP12345 67890', 9)
    const result = postSelect(data)
    expect(result[0].licence_data_value).to.equal('{ "key" : "Some text here with SP12345 67890 value" }')
  })
})
