const fs = require('fs')

function authenticateUser (id, password) {
  API.user.login(id, password, (data) => {
    cb(data)
  })
/**
  if (id==='demouser' && password==='password'){
  var user={status:true,user:{name:'Demo User',userid:1},message:null}
  } else {
  var user={status:false,user:null,message:'incorrect username or password'}
  }

  return user
  **/
}

module.exports = {
  authenticate: authenticateUser
}
