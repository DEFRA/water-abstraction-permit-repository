'use strict'
require('dotenv').config()

// See Code API ref at https://github.com/hapijs/code/blob/HEAD/API.md

// requires for testing
const Code = require('code')

const expect = Code.expect
const Lab = require('lab')
const lab = exports.lab = Lab.script()

// use some BDD verbage instead of lab default
const describe = lab.describe
const it = lab.it
const after = lab.after



const db = require('../../src/lib/db.js')
// tests
describe('Test Database Connection', () => {
  it('should return data', (done) => {
        // make API call to self to test functionality end-to-end
        db.query('select 1', [], (response) => {
      expect(response).to.exist()
      expect(response).to.be.a.object()
      done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})


// tests
