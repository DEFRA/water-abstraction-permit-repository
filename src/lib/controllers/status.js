const pkg = require('../../../package.json')

const statusResponse = { version: pkg.version }

exports.getStatus = () => statusResponse
