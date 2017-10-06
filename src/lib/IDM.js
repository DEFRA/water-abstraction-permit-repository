const baseFilePath = __dirname + '/../public/data/licences/'
const Helpers = require('./helpers')
const DB = require('./db')



function loginError(){
  reply({user_id:null,err:'Unknown user name or password'}).code(401)
}


/**
This file acts as a temporary IDM solution until such is in place
As such, it should only be used to create and manage users and their relationships with licences
**/

function createUser (request,reply) {
  /**
  Expects
  payload
    .username (string)
    .password (string)
    .admin  (1|0)
    .user_data (arbitrary object)
  **/
  Helpers.createHash(request.payload.password, (err, hashedPW)=> {
    var query = `insert into permit.users (user_name,password,admin,user_data)
    values ($1,$2,$3,$4)`
    var queryParams = [request.payload.username,hashedPW,request.payload.admin,JSON.stringify(request.payload.user_data)]
    DB.query(query, queryParams)
      .then((res) => {
        //res.err = null if no error
        //res.data
        reply(res)
      })
  });
}

function updatePassword (request, reply) {
  /**
  Expects
  payload
    .username (string)
    .password (string)
  **/
  Helpers.createHash(request.payload.password, (err, hashedPW)=> {
    var query = `update permit.users set password = $1, reset_guid = NULL where user_name = $2`
    var queryParams = [hashedPW, request.payload.username]
    DB.query(query, queryParams)
      .then((res) => {
        //res.err = null if no error
        //res.data
        reply(res)
      })
  });
}

function changePasswordWithResetLink (request, reply) {
  /**
  Expects
  payload
    .username (string)
    .resetGuid (string)
    .password (string)
  **/
  var query = `select reset_guid from permit.users where user_name = $1`
  var queryParams = [request.payload.username]
  DB.query(query, queryParams)
    .then((res) => {
      console.log(res.data)
      if(res.err) {
        reply(res.err).code(500)
      } else if (!res.data || !res.data[0]) {
        reply({err:'Reset GUID not found for user'}).code(500)
      } else {
        var resetGuid = res.data[0].reset_guid
        console.log(resetGuid)
        if (resetGuid != request.payload.resetGuid) {
          reply({err:'Invalid reset GUID'}).code(500)
        } else {
          updatePassword(request, reply)
        }
      }
    })
}

function resetPassword (request, reply) {
  /**
  Expects
  payload
    .emailAddress (string)
  **/
  var resetGuid = Helpers.createGUID()
  console.log('resetGuid: '  + resetGuid)
  var query = `update permit.users set reset_guid = $1 where user_name = $2`
  var queryParams = [resetGuid, request.payload.emailAddress]
  DB.query(query, queryParams)
    .then((res) => {
      //res.err = null if no error
      //res.data
      console.log(res)
      reply(res)
    })
}

function getResetPasswordGuid (request,reply) {
  /**
  Expects
  payload
    .emailAddress (string)
  **/
  var query = `select reset_guid from permit.users where user_name = $1`
  var queryParams = [request.query.emailAddress]
  DB.query(query, queryParams)
    .then((res) => {
      if(res.err) {
        reply(res.err).code(500)
      } else if (!res.data || !res.data[0]){
        reply({err:'Reset GUID not found for user'}).code(500)
      } else {
        reply(res.data[0])
      }
    })
}

function loginUser(request,reply){
    var query = `select user_id,password from permit.users where user_name=$1`
    var queryParams = [request.payload.user_name]
    console.log(request.payload)
    DB.query(query, queryParams)
      .then((UserRes) => {
        console.log('UserRes')
        console.log(UserRes)
        if(UserRes.data[0]){
        Helpers.compareHash(request.payload.password, UserRes.data[0].password,(err,PasswordRes)=>{
          console.log(err)
          console.log(PasswordRes)
          if(PasswordRes){
            reply({user_id:UserRes.data[0].user_id,err:null})
          } else {
            loginError()
          }
        });
      } else {
        loginError()
      }
      })
}

function loginAdministrator(user_name,password,cb){
    var query = `select user_id,user_name,password from permit.users where user_name=$1 and admin=1`
    var queryParams = [user_name]
    DB.query(query, queryParams)
      .then((UserRes) => {
        console.log(UserRes)
        if(UserRes.data[0]){
          console.log('found candidate user')
          console.log(UserRes.data[0])
        Helpers.compareHash(password, UserRes.data[0].password,(err,PasswordRes)=>{
          console.log(err)
          console.log(PasswordRes)
          if(PasswordRes){
          console.log('found password user')
            cb(null,{user_id:UserRes.data[0].user_id,user_name:UserRes.data[0].user_name})
          } else {
                      console.log('not found password user')
            cb({error:'login error'})
          }
        });
      } else {
                  console.log('found issue with user')
            cb({error:'login error'})
      }
      })
}



function getUser(request,reply){
  var query = `select * from permit.users where user_id=$1`
  var queryParams = [request.params.user_id]
  DB.query(query, queryParams)
    .then((res) => {
      if(res.err){
        reply(res.err).code(500)
      } else if (!res.data || !res.data[0]){
        reply({err:'An error occurred'}).code(500)
      } else {
        var user=res.data[0];
        delete user.password
        console.log('got the user')
      reply(user)
      }

    })
}

function addLicenceToUser(request,reply){
  var query = `insert into permit.user_licence (user_id,licence_id) values ($1,$2)`
  var queryParams = [request.params.user_id,request.payload.licence_id]
  DB.query(query, queryParams)
    .then((res) => {
      reply(res)
    })

}

module.exports = {
  createUser: createUser,
  updatePassword: updatePassword,
  resetPassword: resetPassword,
  getResetPasswordGuid: getResetPasswordGuid,
  changePasswordWithResetLink: changePasswordWithResetLink,
  loginUser: loginUser,
  loginAdministrator: loginAdministrator,
  getUser: getUser,
  addLicenceToUser: addLicenceToUser,
  loginError: loginError
}
