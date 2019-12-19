require('dotenv').config();
const helpers = require('@envage/water-abstraction-helpers');

const config = require('../../../config.js');
const { logger } = require('../../logger');

exports.pool = helpers.db.createPool(config.pg, logger);
