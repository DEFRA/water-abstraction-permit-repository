const baseFilePath = __dirname + '/../public/data/licences/'
const Helpers = require('./helpers')
const DB = require('./db')
const IDM = require('./IDM')
const Boom = require('Boom')

/**
this file provides tactical functions that may not exist in the final product
**/



function encryptToken (data) {
  var key = process.env.JWT_SECRET
  var JWT = require('jsonwebtoken')
  var token = JWT.sign(data, key)
  return(token)
}

function decryptToken(token){
  var key = process.env.JWT_SECRET
  var JWT = require('jsonwebtoken')
  var data = JWT.descrypt(token, key)
  return(data)
}


function setUp(request, reply){
  //run generic setup script...
  var query = `
  drop table if exists permit.users cascade;
   CREATE TABLE permit.users
(
    user_id serial NOT NULL,
    user_name character varying,
    password character varying,
    PRIMARY KEY (user_id)
)
WITH (
    OIDS = FALSE);
  drop table if exists permit.user_licence cascade;
    CREATE TABLE permit.user_licence
(
    id serial NOT NULL,
    licence_id bigint,
    user_id bigint,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);
`
  var queryParams = []
  DB.query(query, queryParams)
    .then((res) => { reply(res) })

}

function getUser (request, reply) {
  /**
    tactical function to represent the end result of authorising a user via Verify...

    input: username and password
    output: user id
  **/
  var query = `select * from permit.users where user_name=$1`
  var queryParams = [request.payload.username]
  console.log(query);
  console.log(queryParams);

  DB.query(query, queryParams)
    .then((UserRes) => {
      console.log('now verify password hash')
      console.log(UserRes.data)
      if (UserRes.data[0]){
        var thisUser=UserRes.data[0]

      Helpers.compareHash(request.payload.password, thisUser.password,(err,PasswordRes)=>{
        console.log("password is valid?")
        console.log(err)
        console.log(PasswordRes)

        console.log(request.state)

        getUserLicences(thisUser,(licences)=>{
          var data={};
          var sessionCookie={}
          data.sessionGuid=Helpers.createGUID()
          sessionCookie.userGuid=Helpers.createGUID()
          sessionCookie.user=thisUser;
          data.licences=licences;
          data.sessionCookie=encryptToken(sessionCookie);

          var authSession=sessionCookie.user;
          console.log('here?')

          reply(data);
        })
      });
      } else {
        reply(Boom.unauthorized());
      }
    })
}



function userLicencesWrapper (request,reply, cb) {
  getUserLicences(request.payload.user,(licences)=>{
    console.log('did this')
    reply(licences)
  })
}
function getUserLicences (user, cb) {
  /**
    tactical function to represent the end result of getting a list of licences available to a user id...
    input: user id
    output: array of licence header objects
  **/


  console.log(user)
  var query = `select * from permit.user_licence where user_id=$1`
  var queryParams = [user.user_id]

  DB.query(query, queryParams)
    .then((res) => {
      console.log('got user licences')
      console.log(res)
      if(res.data[0]
        && res.data[0].licence_id==0){

        var query = `select
        o.org_nm,t.type_nm,l.* from permit.licence l
        join permit.org o on l.licence_org_id=o.org_id
        join permit.type t on l.licence_type_id = t.type_id
        `
        var queryParams = []
        DB.query(query, queryParams)
          .then((res) => {
              cb(res)
        })

      } else {
        //generate an in clause for licences
        var availableLicences=[];
        for(l in res.data){
          if(availableLicences.indexOf(res.data[l].licence_id)==-1){
            availableLicences.push(parseInt(res.data[l].licence_id))
          }
        }

        console.log(availableLicences)
        var query = `select
        o.org_nm,t.type_nm,l.* from permit.licence l
        join permit.org o on l.licence_org_id=o.org_id
        join permit.type t on l.licence_type_id = t.type_id where l.licence_id in (${availableLicences.join(",")})`
        var queryParams = [];

        console.log(query)
        console.log(queryParams)

        DB.query(query, queryParams)
          .then((res) => {
              cb(res)
        })


      }





     })





}






function login (user_name,password,cb) {
  IDM.loginAdministrator(user_name,password,(err,res)=>{
      console.log(err);
      console.log(res);
      if(!err){
        cb (null,res)
      } else {
        cb(true,null)
      }
    })
}

function generateSearchKeys (request,reply) {
  var query = `select * from permit.licence_data`
  var queryParams = [];
  DB.query(query, queryParams)
    .then((res) => {
      for (d in res.data){
        searchKey=[]
        dataObj=JSON.parse(res.data[d].licence_data_value)
        searchKey.push(dataObj.name)
        searchKey.push(dataObj.address)
        searchKey.push(dataObj.postCode)

      for (p in dataObj.purposes){
        var purpose=dataObj.purposes[p]
        searchKey.push(purpose.primaryCode)
        searchKey.push(purpose.secondaryCode)
        searchKey.push(purpose.description)
                for (po in purpose.points){

        searchKey.push(purpose.points[po].name)
        searchKey.push(purpose.points[po].ngr1)
        searchKey.push(purpose.points[po].meansOfAbstraction)

                }

      }


        var query = `update permit.licence set licence_search_key=$1 where licence_id=$2`
        var queryParams = [searchKey.join('|'),res.data[d].licence_id];
        console.log(queryParams)
        DB.query(query, queryParams)
          .then((res) => {
            console.log(res)
          })

//        console.log(JSON.parse(res.data[d].licence_data_value))
        //licence_data_value
      }
      reply({ok:true})
  })
}




module.exports = {
    login:login,
    IDM:{getUser:getUser},
    CRM:{getUserLicences:userLicencesWrapper},
    setup:setUp,
    getUserLicences:getUserLicences,
    generateSearchKeys:generateSearchKeys
}
