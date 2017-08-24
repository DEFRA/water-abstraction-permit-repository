require('dotenv').config()


const Hapi = require('hapi')
const serverOptions={connections:{router:{stripTrailingSlash:true}}}
const server = new Hapi.Server(serverOptions)

server.connection({ port: process.env.PORT || 8000 })



if(process.env.DATABASE_URL){
  //get heroku db params from env vars

  var workingVariable=process.env.DATABASE_URL.replace('postgres://','')
  console.log(workingVariable)
  process.env.PGUSER=workingVariable.split('@')[0].split(':')[0]
  process.env.PGPASSWORD=workingVariable.split('@')[0].split(':')[1]
  process.env.PGHOST=workingVariable.split('@')[1].split(':')[0]
  process.env.PSPORT=workingVariable.split('@')[1].split(':')[1].split('/')[0]
  process.env.PGDATABASE=workingVariable.split('@')[1].split(':')[1].split('/')[1]
}

const cacheKey=process.env.cacheKey||'super-secret-cookie-encryption-key'
console.log('Cache key'+cacheKey)
const sessionPluginOptions = {
  cache: { segment: 'unique-cache-sement' },
  cookie: { isSecure: false },
  key: 'bla-bla-bla'
}


//isSecure = true for live...
var yar_options = {
    storeBlank: false,
    cookieOptions: {
        password: 'the-password-must-be-at-least-32-characters-long',
        isSecure: false
    }
};

server.register({
    register: require('yar'),
    options: yar_options
}, function (err) { });

/**
server.register(
  { register: require('hapi-server-session'), options: sessionPluginOptions },
  (err) => {
    if (err) {
      throw err
    }
  }
)
**/

server.register([require('hapi-auth-jwt2'),require('inert'), require('vision')], (err) => {
  if (err) {
    throw err
  }


  var people = { // our "users database"
      1: {
        id: 1,
        name: 'Jen Jones'
      }
  };

  // bring your own validation function
  var validate = function (decoded, request, callback) {
      console.log('CALL WITH TOKEN')
      console.log(decoded)
      // do your checks to see if the person is valid
      if (!people[decoded.id]) {
        return callback(null, false);
      }
      else {
        return callback(null, true);
      }
  };

  server.auth.strategy('jwt', 'jwt',
      { key: process.env.JWT_SECRET,          // Never Share your secret key
        validateFunc: validate,            // validate function defined above
        verifyOptions: {} // pick a strong algorithm
      });

      server.auth.default('jwt');

  // load views
  server.views(require('./src/views'))

  // load routes
  server.route(require('./src/routes/public'))
  server.route(require('./src/routes/API'))
  server.route(require('./src/routes/admin'))
  server.route(require('./src/routes/tactical'))
})



// Start the server
server.start((err) => {
  if (err) {
    throw err
  }

//TODO: create initial tables etc if they don't exist...


const { Client } = require('pg')
const client = new Client()
client.connect()
client.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE  table_schema = 'permit' AND table_name = 'licence'   );", [], (err, res) => {
  console.log(res.rows)
  if(err){
  console.log(err ? err.stack : res.rows[0]) // Hello World!
  client.end()
} else if (!res.rows[0].exists){
  console.log('db check: missing tables...')
  var fs = require('fs');
  var sql = fs.readFileSync('db/dbcreate.sql').toString();
client.query(sql, [], (err, res) => {
  if(err){
    console.log(err ? err.stack : res.rows[0]) // Hello World!
    client.end()
  } else {
    console.log('db restore completed')
    client.end()
  }
})
} else {
  console.log('db check: system table check complete')
  client.end()
}

})




  console.log('Server running at:', server.info.uri)
})
module.exports = server
