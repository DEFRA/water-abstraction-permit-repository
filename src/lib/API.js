function reset (request, reply) {
  reply({});
}

function getToken (request, reply) {
  var key = process.env.JWT_SECRET;
  var JWT = require('jsonwebtoken');
  var obj = { id: 1, 'name': 'test' }; // object/info you want to sign
  var token = JWT.sign(obj, key);
  reply(token);
}

module.exports = {
  system: {getToken},
  general: {
    reset: reset
  }
};
