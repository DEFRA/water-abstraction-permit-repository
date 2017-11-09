const baseFilePath = __dirname + '/../public/data/licences/'
const Helpers = require('./helpers')
const DB = require('./connectors/db')



const dbSchema = {
  schemaName: 'permit',
  tables: {
    systemFields: 'field',
    regimes: 'regime',
    licenceHeader: 'licence',
    licenceData: 'licence_data',
    licenceType: 'type',
    licenceDef: 'type_fields',
    licenceShortcode: 'licence_shortcode',
    licenceUsers: 'user_licence'
  }

}

function makeURIRequest (uri, cb) {
  httpRequest(uri+'?token='+process.env.JWT_TOKEN, function (error, response, body) {
    var data = JSON.parse(body)
    cb(data)
  })
}

function makeURIPostRequest(uri,data,cb){
  console.log('make http post')
  httpRequest.post({
            url: uri+'?token='+process.env.JWT_TOKEN,
            form: data
        },
        function (err, httpResponse, body) {
            console.log('got http post')
//            console.log(err, body);
            cb({err:err,data:body})

        });
}

function getFields (request, reply) {
  var query = `SELECT * from ${dbSchema.schemaName}.${dbSchema.tables.systemFields}`
  var queryParams = []
  DB.query(query, queryParams)
    .then((res) => { reply(res) })
}

function listregimes (request, reply) {
// list all regimes
  var query = `SELECT * from ${dbSchema.schemaName}.${dbSchema.tables.regimes}`
  var queryParams = []

  DB.query(query, queryParams)
  .then((res) => {
    reply(res)
  })
}

function createRegime (request, reply) {
  // create new regime
  var query = `insert into ${dbSchema.schemaName}.${dbSchema.tables.regimes} values ($1) RETURNING regime_id`
  var queryParams = [request.params.regime_nm]
  DB.query(query, queryParams)
  .then((res) => {
    reply(res)
  })
}

function getRegime (request, reply) {
// return specified org
  var query = `SELECT * from ${dbSchema.schemaName}.${dbSchema.tables.regimes} where regime_id = $1`
  var queryParams = [request.params.regime_id]
  DB.query(query, queryParams)
  .then((res) => {
    reply(res)
  })
}

function putRegime (request, reply) {
// update specified org
  var query = `update ${dbSchema.schemaName}.${dbSchema.tables.regimes} set regime_nm = $2 where regime_id = $1`
  var queryParams = [request.params.regime_id, request.payload.regime_nm]
  DB.query(query, queryParams)
  .then((res) => {
    reply(res)
  })
}

function deleteRegime (request, reply) {
  // delete specified org]
  reply('org delete not in place')
}

function listLicenceTypes (request, reply) {
// return all licence types for org
  var query = `SELECT type_nm,type_id from ${dbSchema.schemaName}.${dbSchema.tables.licenceType} where regime_id=$1`
  var queryParams = [request.params.regime_id]

  DB.query(query, queryParams)
  .then((res) => {
    reply(res)
  })
}

function createLicenceType (request, reply) {
// return all licence types for org

  var query = `insert into ${dbSchema.schemaName}.${dbSchema.tables.licenceType} (type_nm,regime_id) values ($1,$2) RETURNING type_id`
  var queryParams = [request.payload.type_nm, request.params.regime_id]
  DB.query(query, queryParams)
  .then((res) => {
    reply(res)
  })
}

function getLicenceType (request, reply) {
  // return specific licence type definition for org
  var query = `SELECT $1::int as type_id, array_to_json(array_agg(attributes)) as attributeData from
    (
        select tf.type_fields_id,tf.field_id,tf.type_field_alias,f.field_definition,tf.is_required,tf.is_public_domain,f.field_nm
		      from ${dbSchema.schemaName}.${dbSchema.tables.licenceDef} tf
		        inner join ${dbSchema.schemaName}.${dbSchema.tables.systemFields} f on tf.field_id = f.field_id
            where tf.type_id=$1
    ) attributes`

  var queryParams = [request.params.type_id]

  DB.query(query, queryParams)
  .then((res) => {
    console.log(res)
    reply(res)
  })
}

function getlicenceTypeFields (request, reply) {
// list all regimes

  var query = `SELECT tf.*,f.field_nm from ${dbSchema.schemaName}.${dbSchema.tables.licenceDef} tf
    join ${dbSchema.schemaName}.${dbSchema.tables.systemFields} f on tf.field_id=f.field_id
    where type_id=$1`
  var queryParams = [request.params.type_id]
  DB.query(query, queryParams)
  .then((res) => {
    reply(res)
  })
}

function createlicenceTypeField (request, reply) {
  // TODO: deal with an array of fields being added...

  console.log(request.payload.types)

  if (request.payload.types) {
    console.log('complex add multi field type')
    var query = ''
    var queryParams = []

    for (type in request.payload.types) {
      var thisType = request.payload.types[type]
      console.log(thisType)
      if (thisType.is_required && thisType.is_required == 1) {

      } else {
        thisType.is_required = 0
      }
      if (thisType.is_public_domain && thisType.is_public_domain == 1) {
        console.log('pd exists')
      } else {
        console.log('NO pd exists')
        thisType.is_public_domain = 0
      }
      console.log(thisType)
      query += `insert into
        ${dbSchema.schemaName}.${dbSchema.tables.licenceDef}
        (type_id,field_id,is_required,is_public_domain,type_field_alias)
        values (${request.params.type_id},${thisType.field_id},${thisType.is_required}::bit(1),${thisType.is_public_domain}::bit(1),'${thisType.type_field_alias}');`
    }
  } else {
    console.log('basic add single field type')
    if (request.payload.is_required && request.payload.is_required == 1) {

    } else {
      request.payload.is_required == 0
    }
    if (request.payload.is_public_domain && request.payload.is_public_domain == 1) {

    } else {
      request.payload.is_public_domain == 0
    }

    var query = `insert into
      ${dbSchema.schemaName}.${dbSchema.tables.licenceDef}
      (type_id,field_id,is_required,is_public_domain,type_field_alias)
      values ($1,$2,$3,$4,$5)`
    var queryParams = [request.params.type_id, request.payload.field_id, request.payload.is_required, request.payload.is_public_domain,
      request.payload.type_field_alias]
  }

  console.log(query)
  console.log(queryParams)
  DB.query(query, queryParams)
  .then((res) => {
    console.log(res)
    reply(res)
  })
}

function listLicences (request, reply) {
// return licence summaries for org & type
  var queryParams = [request.params.regime_id, request.params.type_id]
  var query = `SELECT licence_id, licence_ref, licence_search_key
  from ${dbSchema.schemaName}.${dbSchema.tables.licenceHeader}
  where licence_regime_id=$1 and licence_type_id=$2`
  DB.query(query, queryParams)
  .then((res) => {
    reply(res)
  })
}

function createLicence (request, reply) {
  console.log('create licence!')
  var payload = request.payload
  var foundErrors = false
  var errors = []

  function reject (msg) {
    reply({'error': msg}).code(500)
  }
  // convert incoming JSON to series of queries...

  // 1. check primary attributes
  if (typeof payload.licence_id !== 'undefined') {
    reject(['cannot post existing licence id'])
  } else if (typeof payload.licence_ref === 'undefined') {
    reject(['licence_ref must be defined'])
  } else if (typeof request.params.type_id === 'undefined') {
    reject(['licence_type_id must be defined'])
  } else if (typeof request.params.regime_id === 'undefined') {
    reject(['licence_regime_id must be defined'])
  } else {
//    console.log('primary fields validated')
    // 2. get secondary attributes by licence_type_id (and verify licence_regime_id is correct for licence_type_id)

    var queryParams = [request.params.regime_id, request.params.type_id]

    // this query will only return records where type_id is defined for regime_id
    var query = `SELECT array_to_json(array_agg(attributes)) as attributeData
    from (
      select
      tf.type_fields_id,tf.field_id,tf.type_field_alias,f.field_definition, tf.is_required
      from ${dbSchema.schemaName}.type_fields tf
      inner join ${dbSchema.schemaName}.field f on tf.field_id = f.field_id
      inner join ${dbSchema.schemaName}.type t on tf.type_id = t.type_id
          where tf.type_id=$2 and t.regime_id=$1
      ) attributes
          `

    DB.query(query, queryParams)
  .then((res) => {
      // build structure containing all attributes so we can verify against payload attributes...
    var returnedAttributeDefinition = res.data[0].attributedata
    var attributeDefinitions = {}
    for (attribute in returnedAttributeDefinition) {
      var thisAttribute = returnedAttributeDefinition[attribute]
      attributeDefinitions[thisAttribute.type_field_alias] = thisAttribute
    }

    // 3. iterate over the secondary attributes and check they exist...
    var searchKey = ''

    // check for missing required fileds

    for (secondaryAttribute in attributeDefinitions) {
      if (attributeDefinitions[secondaryAttribute].is_required == 1 && typeof payload.attributes[secondaryAttribute] === 'undefined') {
        errors.push('required attribute ' + secondaryAttribute + ' was not supplied')
        foundErrors = true
        break
      }
    }

    for (secondaryAttribute in payload.attributes) {
      if (typeof attributeDefinitions[secondaryAttribute] === 'undefined') {
        errors.push('unknown attribute: ' + secondaryAttribute)
        foundErrors = true
      } else if (attributeDefinitions[secondaryAttribute].is_required == 1 && typeof payload.attributes[secondaryAttribute] === 'undefined') {
        errors.push('required attribute ' + secondaryAttribute + ' was not supplied')
        foundErrors = true

        // TODO: type validation and other rules...
      } else if (attributeDefinitions[secondaryAttribute].field_definition.type == 'array' && !Array.isArray(payload.attributes[secondaryAttribute])) {
        errors.push('array attribute ' + secondaryAttribute + ' was not an array')
        foundErrors = true
      } else {
        searchKey += '|' + payload.attributes[secondaryAttribute]
      }
    }
    if (!foundErrors) {
      // 4. insert main row

      query = `
        INSERT INTO ${dbSchema.schemaName}.${dbSchema.tables.licenceHeader}
        (licence_regime_id,licence_type_id,licence_ref,licence_status_id,licence_search_key,licence_start_dt,licence_end_dt)
        VALUES
        ($1,$2,$3,$4,$5,to_date($6::text,'YYYY/MM/DD'),to_date($7::text,'YYYY/MM/DD'))
        RETURNING licence_id`
      var queryParams = [request.params.regime_id, request.params.type_id, payload.licence_ref, 1, searchKey, payload.licence_start_dt, payload.licence_end_dt]

      console.log(query)

      DB.query(query, queryParams)
  .then((res) => {
    if (res.error) {
      console.log(res.err)
      reject(err)
    } else {
      var licence_id = res.data[0].licence_id

      var queryParams = []
      var query = ''
      for (secondaryAttribute in payload.attributes) {
        query += `insert into ${dbSchema.schemaName}.${dbSchema.tables.licenceData} values
        (
          ${licence_id},
          '${JSON.stringify(payload.attributes[secondaryAttribute]).toString().replace(/'/g, "''")}',
          ${attributeDefinitions[secondaryAttribute].type_fields_id}
        );`
      }

// var b = a.replace(/'/g, '''');

      queryParams = []

      console.log(query)

      DB.query(query, queryParams)
  .then((res) => {
    if (res.error) {
      console.log(res.error)
      reject(res.error)
    } else {
      console.log('no db error')
      reply({error: null, data: {licence_id: licence_id}})
    }
  })
    }
  })
      // 5. insert attributes:
      // licence_id, licence_data_value, type_fields_id,
    } else {
      reject(errors)
    }
  })
  }
}

function getLicence (request, reply) {
// return specific licence for org & type
  var queryParams = [request.params.regime_id, request.params.type_id, request.params.licence_id]
  // swanky query to get the licence data
  var query = `
  select l.*,a.* from
  ${dbSchema.schemaName}.${dbSchema.tables.licenceHeader} l
  left outer join
  (
	SELECT licence_id,array_to_json(array_agg(attributes)) as attributeData
	from
		(
		select
		licence_id,type_field_alias, licence_data_value,ld.type_fields_id,tf.field_id
		from ${dbSchema.schemaName}.${dbSchema.tables.licenceData} ld
		inner join ${dbSchema.schemaName}.${dbSchema.tables.licenceDef} tf on ld.type_fields_id = tf.type_fields_id
		inner join ${dbSchema.schemaName}.${dbSchema.tables.systemFields} f on tf.field_id = f.field_id
    where ld.licence_id=$3 and
    tf.type_id=$2
        ) attributes
	group by licence_id
) a on a.licence_id = l.licence_id
where l.licence_regime_id = $1 and l.licence_type_id=$2 and l.licence_id=${request.params.licence_id}
`

  DB.query(query, queryParams)
  .then((res) => {
    if(res.data[0]){
      // set initial licence data
      var licenceData = {}
      console.log(licenceData)
      licenceData.licence_id = res.data[0].licence_id
      licenceData.licence_ref = res.data[0].licence_ref
      licenceData.licence_start_dt = res.data[0].licence_start_dt
      licenceData.licence_end_dt = res.data[0].licence_end_dt
      licenceData.licence_status_id = res.data[0].licence_status_id
      licenceData.licence_type_id = res.data[0].licence_type_id
      licenceData.licence_regime_id = res.data[0].licence_regime_id
      licenceData.attributes = {}
      licenceData.attributeDefinitions = {}

      // get ALL attributes from type definition
      queryParams = [request.params.type_id]
      var query = `SELECT $1::int as type_id, array_to_json(array_agg(attributes)) as attributeData
      from (
    select
        tf.type_fields_id,tf.field_id,tf.type_field_alias,f.field_definition,tf.is_required,tf.is_public_domain,f.field_nm
        from ${dbSchema.schemaName}.${dbSchema.tables.licenceDef} tf
        inner join ${dbSchema.schemaName}.${dbSchema.tables.systemFields} f on tf.field_id = f.field_id
            where tf.type_id=$1 ) attributes
            `
      console.log(query)
      console.log(JSON.stringify(queryParams))

      DB.query(query, queryParams)
      .then((attributeDefinitionQuery) => {
        console.log(attributeDefinitionQuery)

        for (var attribute in attributeDefinitionQuery.data[0].attributedata) {
          licenceData.attributes[attributeDefinitionQuery.data[0].attributedata[attribute].type_field_alias] = null
          licenceData.attributeDefinitions[attributeDefinitionQuery.data[0].attributedata[attribute].type_field_alias] = attributeDefinitionQuery.data[0].attributedata[attribute]
        }

  /**
  convert licence data to nice friendly format, separating core values (common to all licences regardless of type) and licence/org type specific attributes
  **/

        for (attribute in res.data[0].attributedata) {
          licenceData.attributes[res.data[0].attributedata[attribute].type_field_alias] = JSON.parse(res.data[0].attributedata[attribute].licence_data_value)
        }
        reply({error: null, data: licenceData})
    })
    } else {
      reply({error: 'licence not found', data: null}).code(404)
    }


  })
}

function putLicence (request, reply) {
  var payload = request.payload
  var foundErrors = false
  var errors = []

  function reject (msg) {
    reply({'error': msg})
  }
    // convert incoming JSON to series of queries...

    // 1. check primary attributes
  if (typeof request.params.licence_id === 'undefined') {
    reject(['requires existing licence id'])
  } else if (typeof payload.licence_ref === 'undefined') {
    reject(['licence_ref must be defined'])
  } else if (typeof request.params.type_id === 'undefined') {
    reject(['licence_type_id must be defined'])
  } else if (typeof request.params.regime_id === 'undefined') {
    reject(['licence_regime_id must be defined'])
  } else {
      // 2. get secondary attributes by licence_type_id (and verify licence_regime_id is correct for licence_type_id)

    var queryParams = [request.params.regime_id, request.params.type_id]

      // this query will only return records where type_id is defined for regime_id
    var query = `SELECT array_to_json(array_agg(attributes)) as attributeData
      from (
        select
        tf.type_fields_id,tf.field_id,tf.type_field_alias,f.field_definition, tf.is_required
        from ${dbSchema.schemaName}.type_fields tf
        inner join ${dbSchema.schemaName}.field f on tf.field_id = f.field_id
        inner join ${dbSchema.schemaName}.type t on tf.type_id = t.type_id
            where tf.type_id=$2 and t.regime_id=$1
        ) attributes
            `

    DB.query(query, queryParams)
    .then((res) => {
        // build structure containing all attributes so we can verify against payload attributes...
      var returnedAttributeDefinition = res.data[0].attributedata
      var attributeDefinitions = {}
      for (attribute in returnedAttributeDefinition) {
        var thisAttribute = returnedAttributeDefinition[attribute]
        attributeDefinitions[thisAttribute.type_field_alias] = thisAttribute
      }
      // 3. iterate over the secondary attributes and check they exist...
      var searchKey = ''

      // check for missing required fileds

      for (secondaryAttribute in attributeDefinitions) {
        if (attributeDefinitions[secondaryAttribute].is_required == 1 && typeof payload.attributes[secondaryAttribute] === 'undefined') {
          errors.push('required attribute ' + secondaryAttribute + ' was not supplied')
          foundErrors = true
          break
        }
      }

      for (secondaryAttribute in payload.attributes) {
        if (typeof attributeDefinitions[secondaryAttribute] === 'undefined') {
          errors.push('unknown attribute: ' + secondaryAttribute)
          foundErrors = true
        } else if (attributeDefinitions[secondaryAttribute].is_required == 1 && typeof payload.attributes[secondaryAttribute] === 'undefined') {
          errors.push('required attribute ' + secondaryAttribute + ' was not supplied')
          foundErrors = true

          // TODO: type validation and other rules...
        } else if (attributeDefinitions[secondaryAttribute].field_definition.type == 'array' && !Array.isArray(payload.attributes[secondaryAttribute])) {
          errors.push('array attribute ' + secondaryAttribute + ' was not an array')
          foundErrors = true
        } else {
          searchKey += '|' + payload.attributes[secondaryAttribute]
        }
      }
      if (!foundErrors) {
        // 4. insert main row

        query = `
          UPDATE ${dbSchema.schemaName}.${dbSchema.tables.licenceHeader}
          set
          licence_ref = $1,
          licence_status_id = $2,
          licence_search_key = $3,
          licence_start_dt =$4,
          licence_end_dt =$5
          where licence_id= $6 and licence_regime_id=$7 and licence_type_id=$8`

        var queryParams = [payload.licence_ref, 1, searchKey, payload.licence_start_dt, payload.licence_end_dt, request.params.licence_id, request.params.regime_id, request.params.type_id]

        DB.query(query, queryParams)
    .then((res) => {
      if (res.error) {
        console.log(res.err)
        reject(err)
      } else {
        var licence_id = request.params.licence_id
        console.log('no db error')

        var queryParams = []
        var query = ''
  // TODO: AUDIT!!!
        query += `delete from ${dbSchema.schemaName}.${dbSchema.tables.licenceData} where licence_id=${request.params.licence_id};`
        for (secondaryAttribute in payload.attributes) {
          query += `insert into ${dbSchema.schemaName}.${dbSchema.tables.licenceData} values
          (
            ${licence_id},
            '${JSON.stringify(payload.attributes[secondaryAttribute])}',
            ${attributeDefinitions[secondaryAttribute].type_fields_id}
          );`
        }

        queryParams = []

        DB.query(query, queryParams)
    .then((res) => {
      if (res.error) {
        console.log(res.error)
        reject(res.error)
      } else {
        console.log('no db error')
        reply({error: null, data: {licence_id: licence_id}})
      }
    })
      }
    })
        // 5. insert attributes:
        // licence_id, licence_data_value, type_fields_id,
      } else {
        reject(errors)
      }
    })
  }
}

function reset (request, reply) {
  // reset all test data
  /*
  var data = {}
  var update = Api.reset((data) => {
    reply(data)
  })
  */
  reply({})
}

function getToken (request, reply) {
  var key = process.env.JWT_SECRET
  var JWT = require('jsonwebtoken')
  var obj = { id: 1, 'name': 'test' } // object/info you want to sign
  var token = JWT.sign(obj, key)
  reply(token)

/**

http://127.0.0.1:8001/API/1.0/field?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFudGhvbnkgVmFsaWQgVXNlciIsImlhdCI6MTQyNTQ3MzUzNX0.KA68l60mjiC8EXaC2odnjFwdIDxE__iDu5RwLdN1F2A

eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFudGhvbnkgVmFsaWQgVXNlciIsImlhdCI6MTQyNTQ3MzUzNX0.KA68l60mjiC8EXaC2odnjFwdIDxE__iDu5RwLdN1F2A
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiQ2hhcmxpZSIsImlhdCI6MTUwMzMxMjM5M30.SDdwAxmrNe4yGWKmIgNC80pWHLd9iTfDp89lHTybn04

**/
}

function createShortcode (request, reply) {
  var shortcode = Helpers.createGUID()
  query = `
    insert into  ${dbSchema.schemaName}.${dbSchema.tables.licenceShortcode}
    (licence_id,shortcode,issued_dt) values ($1,$2,current_timestamp)`

  var queryParams = [request.params.licence_id, shortcode]
  DB.query(query, queryParams)
.then((res) => {
  if (res.error) {
    console.log(res.error)
    reject(res.error)
  } else {
    console.log('no db error')
    reply({error: null, data: {shortcode: shortcode}})
  }
})
}

function useShortcode (request, reply) {

  console.log('sessioncookie')
  console.log(request.payload.sessionCookie)

  var userData=helpers.decryptToken(request.payload.sessionCookie)


  query = `
    select * from  ${dbSchema.schemaName}.${dbSchema.tables.licenceShortcode}
    where shortcode=$1 and user_id is null;
    `

  var queryParams = [request.params.shortcode]
  console.log(query)
  console.log(queryParams)
  DB.query(query, queryParams)
  .then((res) => {
    console.log(res)
    if (res.data[0]) {
      console.log('user id')
      console.log(userData)
      console.log(userData.user.user_id)
      console.log('licence id')
      console.log(res.data[0].licence_id)
      var user_id=userData.user.user_id
      var licence_id=res.data[0].licence_id
      query = `
        update  ${dbSchema.schemaName}.${dbSchema.tables.licenceShortcode}
        set user_id=${userData.user.user_id} where shortcode='${request.params.shortcode}';
        insert into ${dbSchema.schemaName}.user_licence (licence_id,user_id) values (${licence_id},${user_id})
        `

      var queryParams = []
      console.log(query)
      console.log(queryParams)
      DB.query(query, queryParams)
      .then((res) => {
        console.log(res)
        var response={licence_id:licence_id}
        console.log(response)
        reply(response)
      })
    } else {
      console.log('shortcode already used')
      reply({error: 'Shortcode not found or already used'}).code(500)
    }
  })
}

function searchLicence (searchString, cb) {
// return licence summaries for org & type
  var queryParams = [`%${searchString}%`]
  queryParams.push(parseInt(searchString) || 0)
  var query = `SELECT licence_id, licence_ref, licence_search_key
  from ${dbSchema.schemaName}.${dbSchema.tables.licenceHeader}
  where lower(licence_ref) like lower($1) or lower(licence_search_key) like lower($1) or licence_id=$2`
  console.log(query)
  console.log(queryParams)
  DB.query(query, queryParams)
  .then((res) => {
    console.log(res)
    cb(res)
  })
}

function licenceShortcodes (licence_id, cb) {
  var queryParams = [licence_id]
  var query = `SELECT *
  from ${dbSchema.schemaName}.${dbSchema.tables.licenceShortcode}
  where licence_id = $1 and user_id is null`
  DB.query(query, queryParams)
  .then((res) => {
    console.log(res)
    cb(res)
  })
}

function licenceAddshortcode (licence_id, cb) {
  var shortcode = Helpers.createGUID()
  query = `
      insert into  ${dbSchema.schemaName}.${dbSchema.tables.licenceShortcode}
      (licence_id,shortcode,issued_dt,expiry_dt) values ($1,$2,CURRENT_DATE,CURRENT_DATE + INTERVAL '7 day')`

  var queryParams = [licence_id, shortcode]
  DB.query(query, queryParams)
  .then((res) => {
    if (res.error) {
      console.log(res.error)
      cb(res.error, null)
    } else {
      console.log('no db error')
      cb(null, {})
    }
  })
}

function licenceUsers (licence_id, cb) {
  var queryParams = [licence_id]
  var query = `SELECT distinct user_id
  from ${dbSchema.schemaName}.${dbSchema.tables.licenceUsers}
  where licence_id = $1`
  DB.query(query, queryParams)
  .then((res) => {
    console.log(res)
    cb(res)
  })
}

module.exports = {
  system: {getFields: getFields, getToken: getToken},
  regime: {list: listregimes, create: createRegime, delete: deleteRegime, get: getRegime, update: putRegime},
  licencetype: {
    list: listLicenceTypes,
    create: createLicenceType,
    get: getLicenceType,
    getFields: getlicenceTypeFields,
    createField: createlicenceTypeField

  },
  licence: {
    list: listLicences,
    create: createLicence,
    get: getLicence,
    update: putLicence,
    search: searchLicence,
    shortcodes: licenceShortcodes,
    users: licenceUsers,
    addshortcode: licenceAddshortcode

  },
  general: {
    reset: reset,
    makeURIRequest:makeURIRequest,
    makeURIPostRequest:makeURIPostRequest

  },
  shortcode: {
    create: createShortcode,
    use: useShortcode
  }
}
