'use strict'

// Test framework dependencies
const { test, experiment, before } = exports.lab = require('@hapi/lab').script()
const { expect } = require('@hapi/code')

// Thing under test
const controller = require('../../../src/lib/controllers/health')

experiment('lib/controllers/health', () => {
  experiment('.getInfo', () => {
    let info

    before(async () => {
      info = await controller.getInfo()
    })

    test('contains the expected water service version', async () => {
      expect(info.version).to.exist()
    })

    test('contains the git commit hash', async () => {
      expect(info.commit).to.exist()
    })
  })
})
