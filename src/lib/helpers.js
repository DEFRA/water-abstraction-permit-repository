var bcrypt = require('bcrypt');


/**
 * Reduces the resolution of grid references in the supplied string
 * @param {String} str - contains National Grid references
 * @return {String} - with references in form AB 123 123
 */
function reduceGridReferenceResolution(str) {
  const r = /(HO|HP|HT|HU|HW|HX|HY|HZ|NA|NB|NC|ND|NE|NF|NG|NH|NJ|NK|NL|NM|NN|NO|NP|NR|NS|NT|NU|NW|NX|NY|NZ|OV|SC|SD|SE|TA|SH|SJ|SK|TF|TG|SM|SN|SO|SP|TL|TM|SR|SS|ST|SU|TQ|TR|SV|SW|SX|SY|SZ|TV) ?([0-9]{3,5}) ?([0-9]{3,5})/g;
  let match;
  while((match = r.exec(str)) !== null) {
    const newRef = `${ match[1] } ${ match[2].substr(0, 3) } ${ match[3].substr(0, 3) }`;
    str = str.replace(match[0], newRef);
  }

  return str;

}



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
  console.log('bcrypt compare')
  console.log('atring 1 ='+string1)
  console.log('atring 2 ='+string2)
  bcrypt.compare(string1,string2, (err, res)=> {
    console.log('bcrypt compare')
    console.log(err)
    console.log(res)
    if(res){
      console.log('password OK, authorised!')
    } else {
      console.log('password FAIL, unauthorised!')
    }
    console.log('-----')
    cb(err,res)
  })
}

function encryptToken (data) {
  var key = process.env.JWT_SECRET
  var JWT = require('jsonwebtoken')
  var token = JWT.sign(data, key)
  return(token)
}

function decryptToken(token){
  var key = process.env.JWT_SECRET
  var JWT = require('jsonwebtoken')
  var data = JWT.decode(token, key)
  console.log('token decoded')
  console.log(data)
  return(data)
}


module.exports = {
  createGUID:createGUID,
  createHash:createHash,
  compareHash:compareHash,
  encryptToken:encryptToken,
  decryptToken:decryptToken,
  reduceGridReferenceResolution

}
