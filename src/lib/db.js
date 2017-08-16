
const { Client } = require('pg')



console.log("DB....")
console.log(__dirname)

function query(queryString,params,cb){
  const client = new Client()
  client.connect()
  client.query(queryString, params, (err, res) => {
    client.end()
    response={error:null,data:[]};
    if(err){
      response.error=err;
      console.error("DB Error")
      console.error(err)
    } else {
      response.data=res.rows
    }
    cb(response)
  })


}


module.exports={

query:query


}
