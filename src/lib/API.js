function reset (request, h) {
  return h.response({});
}

function getToken (request, h) {
  var key = process.env.JWT_SECRET;
  var JWT = require('jsonwebtoken');
  var obj = { id: 1, 'name': 'test' }; // object/info you want to sign
  var token = JWT.sign(obj, key);
  return h.response(token);
}

module.exports = {
  system: {getToken},
  general: {
    reset: reset
  }
};
