'use strict'
// See Code API ref at https://github.com/hapijs/code/blob/HEAD/API.md

// requires for testing
const Code = require('code')

const expect = Code.expect
const Lab = require('lab')
const lab = Lab.script()

// use some BDD verbage instead of lab default
const describe = lab.describe
const it = lab.it
const after = lab.after



const Helpers = require('../../src/lib/helpers.js')

lab.experiment('Test helper functions', () => {

  lab.test('Return a GUID', async() => {
      expect(Helpers.createGUID()).to.be.a.string();
      expect(Helpers.createGUID()).to.have.length(36);
      return;
  });
});

exports.lab = lab;
