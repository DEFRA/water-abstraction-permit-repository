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

/**
{ method: 'POST', path: '/idm/' + version + '/tactical/user/{user_id}', handler: IDM.createUser },
{ method: 'POST', path: '/idm/' + version + '/tactical/user/login',   handler: IDM.loginUser },
{ method: 'POST', path: '/idm/' + version + '/tactical/user/{user_id}', handler: IDM.getUser },
{ method: 'POST', path: '/idm/' + version + '/tactical/user/{user_id}/addLicence', handler: IDM.addLicenceToUser }
**/

module.exports = {
  createUser:createUser,
  loginUser:loginUser,
  loginAdministrator:loginAdministrator,
  getUser:getUser,
  addLicenceToUser:addLicenceToUser,
  loginError:loginError
}
