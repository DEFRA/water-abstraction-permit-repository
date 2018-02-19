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

const { createGUID, reduceGridReferenceResolution } = require('../../src/lib/helpers.js');

lab.experiment('Test helper functions', () => {

  lab.test('Return a GUID', async() => {
      expect(createGUID()).to.be.a.string();
      expect(createGUID()).to.have.length(36);
      return;
  });

  lab.test('Reduce resolution of NGR in string to 8 digit', async() => {

    const str = "A long SJ 01234 01235 NGR";
    const res = reduceGridReferenceResolution(str);
    expect(res).to.equal("A long SJ 012 012 NGR");
    return;
  });

  lab.test('Ignore dates when filtering NGR strings', async() => {

    const str = "2017-01-01T00:00:00.000Z";
    const res = reduceGridReferenceResolution(str);
    expect(res).to.equal(str);
    return;
  });

});

exports.lab = lab;
