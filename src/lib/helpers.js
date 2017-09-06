var bcrypt = require('bcrypt');
var Tactical = require('./tactical.js');



function createGUID() {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
s4() + '-' + s4() + s4() + s4()
}


function createHash(string,cb){
  const saltRounds = 10;
  bcrypt.hash(string, saltRounds, function(err, hash) {
    cb(err,hash)
  })
}

function compareHash(string1,string2,cb){
  bcrypt.compare(string1,string2, (err, res)=> {
    cb(err,res)
  })
}

function validateBasic (request, user_name, password, callback) {
  // basic login for admin function UI

  console.log(user_name)
  console.log(password)

  const user = Tactical.login(user_name, password, (error, user) => {
    if (error) {
      return callback(null, false)
    } else {
      callback(null, true, { id: user.user_id, name: user.user_name })
    }
  })
}

function validateJWT(decoded, request, callback){
  // bring your own validation function
    console.log('CALL WITH TOKEN')
    console.log(decoded)
      // TODO: JWT tokens to DB...
      // do your checks to see if the person is valid
    if (!decoded.id) {
      return callback(null, false)
    } else {
      return callback(null, true)
    }
  }

module.exports = {
  createGUID:createGUID,
  createHash:createHash,
  compareHash:compareHash,
  validateBasic:validateBasic,
  validateJWT:validateJWT




}
