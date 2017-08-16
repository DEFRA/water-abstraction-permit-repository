'use strict'
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



const Helpers = require('../../src/lib/helpers.js')

// tests
describe('Create guid', () => {
  it('should return a guid', (done) => {
        // make API call to self to test functionality end-to-end
      expect(Helpers.createGUID()).to.be.a.string()
      done()
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})


// tests
