const httpRequest = require('request')
const Helpers = require('./helpers')
const View = require('./view')
const Session = require('./session')
const API = require('./API')
const Tactical = require('./tactical')

function index (request, reply) {
  //view the admin page
  var viewContext = View.contextDefaults(request)
  viewContext.pageTitle = 'GOV.UK - Admin'
  console.log('*** adminIndex ***')
  reply.view('water/admin/index', viewContext)
}

function fields (request, reply) {
  //view the system fields page
  var viewContext = {}
  var uri = request.connection.info.protocol + '://' + request.info.host + '/API/1.0/field'
  console.log(uri)
  API.system.getFields({}, (data) => {
    var viewContext = View.contextDefaults(request)
    viewContext.pageTitle = 'GOV.UK - Admin/Fields'
    viewContext.data = data
    viewContext.debug.data = viewContext.data
    console.log('*** adminIndex ***')
    reply.view('water/admin/fields', viewContext)
  })
}

function organisations (request, reply) {
  //view the organisations page
  API.org.list(request, (data) => {
    var viewContext = View.contextDefaults(request)
    viewContext.pageTitle = 'GOV.UK - Admin/Fields'
    viewContext.data = data
    reply.view('water/admin/organisations', viewContext)
  })
}
function organisationLicenceTypes (request, reply) {
  //view the organisation licence types page
  var viewContext = {}
  API.licencetype.list(request, (data) => {
    var viewContext = View.contextDefaults(request)
    viewContext.pageTitle = 'GOV.UK - Admin/Fields'
    viewContext.data = data.data
    viewContext.org_id = request.params.org_id
    viewContext.debug.data = viewContext.data.data
    reply.view('water/admin/organisationLicenceTypes', viewContext)
  })
}

function organisationLicenceType (request, reply) {
  //view organisation licence types page
  var viewContext = {}
  API.licencetype.get(request, (data) => {
    var viewContext = View.contextDefaults(request)
    viewContext.pageTitle = 'GOV.UK - Admin/Fields'
    console.log(JSON.stringify(data.data))
    if (!data.data[0].attributedata) {
      data.data[0].attributedata = []
    }

    viewContext.debug.data = data.data
    viewContext.data = data.data
    viewContext.org_id = request.params.org_id
    viewContext.type_id = request.params.type_id

    API.system.getFields({}, (fields) => {
      viewContext.fields = fields.data
      viewContext.debug.fields = fields
//      reply(JSON.stringify(viewContext))
      reply.view('water/admin/organisationLicenceType', viewContext)
    })
  })
}

function addFieldToOrganisationLicenceType (request, reply) {
  API.licencetype.createField(request, (data) => {
    reply('<script>location.href=\'/admin/organisation/' + request.params.org_id + '/licencetypes/' + request.params.type_id + '/\'</script>')
  })
}

function findlicenceform(request,reply){
  var viewContext = View.contextDefaults(request)
  viewContext.pageTitle = 'GOV.UK - Admin'
  reply.view('water/admin/search', viewContext)
}

function doFindlicence(request,reply){
  API.licence.search(request.params.search,(d)=>{
      reply(d)
  })
}

function viewLicence(request,reply){
  var viewContext = View.contextDefaults(request)
  viewContext.licence_id=request.params.licence_id
  API.licence.shortcodes(request.params.licence_id,(shortcodes)=>{
    viewContext.shortCodes=shortcodes
      API.licence.users(request.params.licence_id,(users)=>{
            viewContext.users=users
            viewContext.debug={shortCodes:shortcodes,users:users}
            reply.view('water/admin/viewlicence', viewContext)
          })
  })


}

function addShortcode(request,reply){
    API.licence.addshortcode(request.params.licence_id,(res)=>{
      reply.redirect('/admin/licence/'+request.params.licence_id)
    });

}

function users(request,reply){
  var viewContext = View.contextDefaults(request)

  Tactical.IDM.getUsers((users)=>{
    console.log(users)
    viewContext.users=users
    reply.view('water/admin/viewusers', viewContext)

  })
}

function user(request,reply){
  var viewContext = View.contextDefaults(request)




  viewContext.user_id=request.params.user_id
  Tactical.getUserLicences({user_id:request.params.user_id},(licences)=>{
    console.log(licences)
    viewContext.licences=licences
            reply.view('water/admin/viewuser', viewContext)

  })
}

function crmindex (request, reply) {
  //view the admin page
  var viewContext = View.contextDefaults(request)
  viewContext.pageTitle = 'GOV.UK - Admin'
  console.log('*** crmIndex ***')
  reply.view('water/admin/crmIndex', viewContext)
}

function crmEntities(request,reply){
  if(request.query.filter){
    console.log("With FILTER "+request.query.filter)
  }
  var viewContext = View.contextDefaults(request)
  viewContext.pageTitle = 'GOV.UK - Admin'

  URI='http://127.0.0.1:8001/crm/1.0/entity?entity_type='+request.query.entity_type+'&token='+process.env.JWT_TOKEN
    httpRequest(URI, function (error, response, body) {
      var data = JSON.parse(body)
      viewContext.entities=data.data
      console.log(viewContext)
      reply.view('water/admin/crmEntities', viewContext)

    })
}

function crmEntity(request,reply){
  if(request.query.filter){
    console.log("With FILTER "+request.query.filter)
  }
  var viewContext = View.contextDefaults(request)
  viewContext.pageTitle = 'GOV.UK - Admin'

  console.log('get entity')
  console.log('get associations')
  console.log('get documents')

  URI='http://127.0.0.1:8001/crm/1.0/entity/'+request.params.entity_id+'?token='+process.env.JWT_TOKEN
    httpRequest(URI, function (error, response, body) {
      console.log('response from '+URI)
      console.log(body)
      var data = JSON.parse(body)
      data.data.entity=data.data.entity[0]
      viewContext.entities=data.data
      viewContext.debug.entities=data



          console.log(viewContext)

          reply.view('water/admin/crmEntity', viewContext)


      console.log(viewContext)

    })
}

function crmNewRegime(request,reply){
  var viewContext = View.contextDefaults(request)
  viewContext.pageTitle = 'GOV.UK - Admin'
  reply.view('water/admin/crmNewRegime', viewContext)
}
function crmNewCompany(request,reply){
  var viewContext = View.contextDefaults(request)
  viewContext.pageTitle = 'GOV.UK - Admin'
  reply.view('water/admin/crmNewCompany', viewContext)
}
function crmNewIndividual(request,reply){
  var viewContext = View.contextDefaults(request)
  viewContext.pageTitle = 'GOV.UK - Admin'
  reply.view('water/admin/crmNewIndividual', viewContext)
}

function crmDoNewEntity(request,reply){
  console.log(request.payload)
  var data={};
  data.entity_nm=request.payload.entity_nm;
  data.entity_type=request.payload.entity_type;
  data.entity_definition=request.payload.entity_definition;
  var method='post'
      var URI='http://127.0.0.1:8001/crm/1.0/entity'
    httpRequest({
              method: method,
              url: URI + '?token=' + process.env.JWT_TOKEN,
              form: data
          },
          function (err, httpResponse, body) {
              console.log('got http ' + method + ' response')
              console.log(body)
              reply.redirect('/admin/crm/entities/'+JSON.parse(body).data.entity_id);

          });
}

function crmAllEntitiesJSON(request,reply){
  URI='http://127.0.0.1:8001/crm/1.0/entity?token='+process.env.JWT_TOKEN
    httpRequest(URI, function (error, response, body) {
      console.log('response from '+URI)
      console.log(body)
      var data = JSON.parse(body)
      return reply(data.data)
    })
}

function crmAssociateEntity(request,reply){
  console.log('crmAssociateEntity')
  console.log(request.payload)
  var entity_1=request.payload.entity1
  var entity_2=request.payload.entity2
  var data={};
  var method='post'
  if (request.payload.associationType=='up'){
    data.entity_up_type=entity_1.split('|')[0]
    data.entity_up_id=entity_1.split('|')[1]
    data.entity_down_type=entity_2.split('|')[0]
    data.entity_down_id=entity_2.split('|')[1]
    data.access_type=''
    data.inheritable=''
  } else {
    data.entity_up_type=entity_2.split('|')[0]
    data.entity_up_id=entity_2.split('|')[1]
    data.entity_down_type=entity_1.split('|')[0]
    data.entity_down_id=entity_1.split('|')[1]
    data.access_type=''
    data.inheritable=''
  }
  console.log(data)
  var URI='http://127.0.0.1:8001/crm/1.0/entityAssociation'
  var method='post'
    httpRequest({
              method: method,
              url: URI + '?token=' + process.env.JWT_TOKEN,
              form: data
          },
          function (err, httpResponse, body) {
              console.log('got http ' + method + ' response')
              console.log(body)
              reply.redirect('/admin/crm/entities/'+data.entity_up_id);

          });



}

module.exports = {
  index: index,
  fields: fields,
  organisations: organisations,
  organisationLicenceTypes: organisationLicenceTypes,
  organisationLicenceType: organisationLicenceType,
  addFieldToOrganisationLicenceType: addFieldToOrganisationLicenceType,
  findlicence:findlicenceform,
  doFindlicence:doFindlicence,
  viewlicence:viewLicence,
  addShortcode:addShortcode,
  users:users,
  user:user,
  crm:crmindex,
  crmEntities:crmEntities,
  crmEntity:crmEntity,
  crmNewRegime:crmNewRegime,
  crmNewCompany:crmNewCompany,
  crmNewIndividual:crmNewIndividual,
  crmDoNewEntity:crmDoNewEntity,

  crmAllEntitiesJSON:crmAllEntitiesJSON,
  crmAssociateEntity:crmAssociateEntity
}
