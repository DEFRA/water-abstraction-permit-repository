
const Admin= require('../lib/admin')
const Tactical= require('../lib/tactical')

module.exports = [
  { method: 'GET', path: '/admin', config:{ auth: 'simple' }, handler: Admin.index },
  { method: 'GET', path: '/admin/findlicence', config:{ auth: 'simple' }, handler: Admin.findlicence },
  { method: 'GET', path: '/admin/findlicence/{search}', config:{ auth: 'simple' }, handler: Admin.doFindlicence },
  { method: 'GET', path: '/admin/licence/{licence_id}', config:{ auth: 'simple' }, handler: Admin.viewlicence },
  { method: 'GET', path: '/admin/licence/{licence_id}/addshortcode', config:{ auth: 'simple' }, handler: Admin.addShortcode },
  { method: 'GET', path: '/admin/fields', config:{ auth: 'simple' }, handler: Admin.fields },
  { method: 'GET', path: '/admin/users', config:{ auth: 'simple' }, handler: Admin.users },
  { method: 'GET', path: '/admin/users/{user_id}', config:{ auth: 'simple' }, handler: Admin.user },
  { method: 'GET', path: '/admin/organisation', config:{ auth: 'simple' }, handler: Admin.organisations },
  { method: 'GET', path: '/admin/organisation/{org_id}/licencetypes', config:{ auth: 'simple' }, handler: Admin.organisationLicenceTypes },
  { method: 'GET', path: '/admin/organisation/{org_id}/licencetypes/{type_id}', config:{ auth: 'simple' }, handler: Admin.organisationLicenceType },
  { method: 'POST', path: '/admin/organisation/{org_id}/licencetypes/{type_id}/field', config:{ auth: 'simple' }, handler: Admin.addFieldToOrganisationLicenceType },
  { method: 'GET', path: '/admin/crm', config:{ auth: 'simple' }, handler: Admin.crm },
  { method: 'GET', path: '/admin/crm/entities', config:{ auth: 'simple' }, handler: Admin.crmEntities },
  { method: 'GET', path: '/admin/crm/entities/newRegime', config:{ auth: 'simple' }, handler: Admin.crmNewRegime },
  { method: 'GET', path: '/admin/crm/entities/newCompany', config:{ auth: 'simple' }, handler: Admin.crmNewCompany },
  { method: 'GET', path: '/admin/crm/entities/newIndividual', config:{ auth: 'simple' }, handler: Admin.crmNewIndividual },
  { method: 'POST', path: '/admin/crm/entities/new', config:{ auth: 'simple' }, handler: Admin.crmDoNewEntity },

  { method: 'POST', path: '/admin/crm/entities/associate', config:{ auth: 'simple' }, handler: Admin.crmAssociateEntity },
  { method: 'GET', path: '/admin/crm/entities/{entity_id}', config:{ auth: 'simple' }, handler: Admin.crmEntity },
  { method: 'GET', path: '/admin/crm/allentities', config:{ auth: 'simple' }, handler: Admin.crmAllEntitiesJSON }

]
