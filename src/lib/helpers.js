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


module.exports = {
  createGUID:createGUID,
  createHash:createHash,
  compareHash:compareHash




}
