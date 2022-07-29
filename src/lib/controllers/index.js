module.exports = ({ pool, version }) => ({
  RegimeApi: require('./regime.js')({ pool, version }),
  LicenceTypeApi: require('./licence-type.js')({ pool, version }),
  LicenceApi: require('./licence.js')({ pool, version })
})
