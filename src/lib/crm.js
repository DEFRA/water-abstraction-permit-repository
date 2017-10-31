const Helpers = require('./helpers')
const DB = require('./db')
function getAllEntities(request, reply) {
  if (request.query.entity_type) {
    var query = `
      select * from crm.entity where entity_type='${request.query.entity_type}'
    `
  } else {
    var query = `
      select * from crm.entity
    `
  }
  DB.query(query)
    .then((res) => {
      return reply({
        error: res.error,
        data: res.data
      })
    })
}

function createNewEntity(request, reply) {
  var guid = Helpers.createGUID();
  var query = `
    insert into crm.entity(entity_id,entity_nm,entity_type,entity_definition) values ($1,$2,$3,$4)
  `
  var queryParams = [guid, request.payload.entity_nm, request.payload.entity_type, request.payload.entity_definition]
  DB.query(query, queryParams)
    .then((res) => {
      return reply({
        error: res.error,
        data: {
          entity_id: guid
        }
      })
    })
}

function getEntity(request, reply) {
  console.log('called getEntity !!!!!!!!!!!')
  var responseData = {};
  var query = `
    select * from crm.entity where entity_id=$1 or entity_nm=$1
  `
  var queryParams = [request.params.entity_id]
  console.log(query)
  console.log(queryParams)
  DB.query(query, queryParams)
    .then((res) => {
      if(res.data[0]){
        responseData.entity = res.data;
        var entityId=res.data[0].entity_id
      } else {
        responseData.entity = res.data;
        var entityId=0
      }
      console.log(res.data)
      //get upstream entities
      var query = `
    select a.*, eu.entity_nm entity_up_nm, ed.entity_nm entity_down_nm
from crm.entity_association a
join crm.entity eu on a.entity_up_id = eu.entity_id
join crm.entity ed on a.entity_down_id = ed.entity_id
where a.entity_up_id=$1

    union

select a.*, eu.entity_nm entity_up_nm, ed.entity_nm entity_down_nm
from crm.entity_association a
join crm.entity eu on a.entity_up_id = eu.entity_id
join crm.entity ed on a.entity_down_id = ed.entity_id
where a.entity_down_id=$1
    `
      var queryParams = [entityId]
      DB.query(query, queryParams)
        .then((res) => {
          responseData.entityAssociations = res.data;
          var query = `
        select * from crm.document_header where owner_entity_id=$1
      `
          var queryParams = [entityId]
          console.log(query)
          console.log(queryParams)
          DB.query(query, queryParams)
            .then((res) => {
              console.log('document headers')
              console.log(res)
              responseData.documentAssociations = res.data;
              console.log(responseData)
              return reply({
                error: res.error,
                data: responseData
              })
            })
        })
    })
}

function updateEntity(request, reply) {
  var query = `
    update crm.entity set
    entity_nm=$2,
    entity_type=$3,
    entity_definition=$4
  where entity_id=$1
  `
  var queryParams = [request.params.entity_id, request.payload.entity_nm, request.payload.entity_type, request.payload.entity_definition]
  DB.query(query, queryParams)
    .then((res) => {
      return reply({
        error: res.error,
        data: {}
      })
    })
}

function deleteEntity(request, reply) {
  return reply({}).code(501)
}

function getEntityAssociations(request, reply) {
  var query = `
    select * from crm.entity_association
  `
  DB.query(query)
    .then((res) => {
      return reply({
        error: res.error,
        data: res.data
      })
    })
}

function createEntityAssociation(request, reply) {
  var guid = Helpers.createGUID();
  var query = `
    insert into crm.entity_association(entity_association_id,entity_up_type,entity_up_id,entity_down_type,entity_down_id,access_type,inheritable)
      values ($1,$2,$3,$4,$5,$6,$7)
  `
  var queryParams = [
    guid,
    request.payload.entity_up_type,
    request.payload.entity_up_id,
    request.payload.entity_down_type,
    request.payload.entity_down_id,
    request.payload.access_type,
    request.payload.inheritable
  ]
  DB.query(query, queryParams)
    .then((res) => {
      return reply({
        error: res.error,
        data: {
          entity_association_id: guid
        }
      })
    })
}

function getEntityAssociation(request, reply) {
  var query = `
    select * from crm.entity_association where entity_association_id = $1
  `
  var queryParams = [request.params.entity_association_id]
  DB.query(query, queryParams)
    .then((res) => {
      return reply({
        error: res.error,
        data: res.data
      })
    })
}

function updateEntityAssociation(request, reply) {
  var query = `
    update crm.entity_association
    set
    entity_up_type=$2,
    entity_up_id=$3,
    entity_down_type=$4,
    entity_down_id=$5,
    access_type=$6,
    inheritable=$7
    where entity_association_id=$1
  `
  var queryParams = [
    request.params.entity_association_id,
    request.payload.entity_up_type,
    request.payload.entity_up_id,
    request.payload.entity_down_type,
    request.payload.entity_down_id,
    request.payload.access_type,
    request.payload.inheritable
  ]
  DB.query(query, queryParams)
    .then((res) => {
      console.log(res)
      return reply({
        error: res.error,
        data: {}
      })
    })
}

function deleteEntityAssociation(request, reply) {
  return reply({}).code(501)
}

function getDocumentHeaders(request, reply) {
  var query = `
    select * from crm.document_header
  `
  DB.query(query)
    .then((res) => {
      return reply({
        error: res.error,
        data: res.data
      })
    })
}

function createDocumentHeader(request, reply) {
  var guid = Helpers.createGUID();
  var query = `
    insert into crm.document_header(
      document_id,
      regime_entity_id,
      owner_entity_id,
      system_id,
      system_internal_id,
      system_external_id,
      metadata
    )
      values ($1,$2,$3,$4,$5,$6,$7)
  `
  var queryParams = [
    guid,
    request.payload.regime_entity_id,
    request.payload.owner_entity_id,
    request.payload.system_id,
    request.payload.system_internal_id,
    request.payload.system_external_id,
    request.payload.metadata
  ]
  DB.query(query, queryParams)
    .then((res) => {
      return reply({
        error: res.error,
        data: {
          document_id: guid
        }
      })
    })
}

function getDocumentHeader(request, reply) {
  if (request.params.system_id) {
    var query = `
      select * from crm.document_header where system_id = $1 and system_internal_id =$2
    `
    var queryParams = [request.params.system_id, request.params.system_internal_id]
  } else {
    var query = `
      select * from crm.document_header where document_id = $1
    `
    var queryParams = [request.params.document_id]
  }


  DB.query(query, queryParams)
    .then((res) => {
      return reply({
        error: res.error,
        data: res.data
      })
    })
}

function updateDocumentHeader(request, reply) {
  if (request.params.system_id) {
    var query = `
      update crm.document_header
      set
        regime_entity_id=$3,
        owner_entity_id=$4,
        system_id=$5,
        system_internal_id=$6,
        system_external_id=$7,
        metadata=$8
      where system_id = $1 and system_internal_id =$2
    `
    var queryParams = [
      request.params.system_id,
      request.params.system_internal_id,
      request.payload.regime_entity_id,
      request.payload.owner_entity_id,
      request.payload.system_id,
      request.payload.system_internal_id,
      request.payload.system_external_id,
      request.payload.metadata
    ]
  } else {
    var query = `
      update crm.document_header
      set
        regime_entity_id=$2,
        owner_entity_id=$3,
        system_id=$4,
        system_internal_id=$5,
        system_external_id=$6,
        metadata=$7
      where document_id=$1
    `
    var queryParams = [
      request.params.document_id,
      request.payload.regime_entity_id,
      request.payload.owner_entity_id,
      request.payload.system_id,
      request.payload.system_internal_id,
      request.payload.system_external_id,
      request.payload.metadata
    ]
  }


  DB.query(query, queryParams)
    .then((res) => {
      return reply({
        error: res.error,
        data: {}
      })
    })
}

function deleteDocumentHeader(request, reply) {
  return reply({})
}

module.exports = {

  getAllEntities: getAllEntities,
  createNewEntity: createNewEntity,
  getEntity: getEntity,
  updateEntity: updateEntity,
  deleteEntity: deleteEntity,
  getEntityAssociations: getEntityAssociations,
  createEntityAssociation: createEntityAssociation,
  getEntityAssociation: getEntityAssociation,
  updateEntityAssociation: updateEntityAssociation,
  deleteEntityAssociation: deleteEntityAssociation,
  getDocumentHeaders: getDocumentHeaders,
  createDocumentHeader: createDocumentHeader,
  getDocumentHeader: getDocumentHeader,
  updateDocumentHeader: updateDocumentHeader,
  deleteDocumentHeader: deleteDocumentHeader
}