'use strict';

const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab = Lab.script();

const { reduceGridReferenceResolution, isWaterAbstractionLicence } = require('../../src/lib/helpers.js');

lab.experiment('Test helper functions', () => {
  lab.test('Reduce resolution of NGR in string to 8 digit', async () => {
    const str = 'A long SJ 01234 01235 NGR';
    const res = reduceGridReferenceResolution(str);
    expect(res).to.equal('A long SJ 012 012 NGR');
  });

  lab.test('Ignore dates when filtering NGR strings', async () => {
    const str = '2017-01-01T00:00:00.000Z';
    const res = reduceGridReferenceResolution(str);
    expect(res).to.equal(str);
  });
});

lab.experiment('Test isWaterAbstractionLicence', () => {
  lab.test('It should return true for a water abstraction licence', async () => {
    const row = { licence_regime_id: 1, licence_type_id: 8 };
    expect(isWaterAbstractionLicence(row)).to.equal(true);
  });

  lab.test('It should return true for a water abstraction licence with string values', async () => {
    const row = { licence_regime_id: '1', licence_type_id: '8' };
    expect(isWaterAbstractionLicence(row)).to.equal(true);
  });

  lab.test('It should return false for another water regime licence', async () => {
    const row = { licence_regime_id: 1, licence_type_id: 7 };
    expect(isWaterAbstractionLicence(row)).to.equal(false);
  });

  lab.test('It should return false for another water regime licence with string values', async () => {
    const row = { licence_regime_id: '1', licence_type_id: '7' };
    expect(isWaterAbstractionLicence(row)).to.equal(false);
  });

  lab.test('It should return false for a different regime', async () => {
    const row = { licence_regime_id: 2, licence_type_id: 8 };
    expect(isWaterAbstractionLicence(row)).to.equal(false);
  });

  lab.test('It should return false for a different regime and type', async () => {
    const row = { licence_regime_id: 2, licence_type_id: 7 };
    expect(isWaterAbstractionLicence(row)).to.equal(false);
  });
});

exports.lab = lab;
