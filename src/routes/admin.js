
const Admin= require('../lib/admin')

module.exports = [

  { method: 'GET', path: '/admin', config:{ auth: false }, handler: Admin.index },
  { method: 'GET', path: '/admin/fields', config:{ auth: false }, handler: Admin.fields },
  { method: 'GET', path: '/admin/organisation', config:{ auth: false }, handler: Admin.organisations },
  { method: 'GET', path: '/admin/organisation/{orgId}/licencetypes', config:{ auth: false }, handler: Admin.organisationLicenceTypes },
  { method: 'GET', path: '/admin/organisation/{orgId}/licencetypes/{typeId}', config:{ auth: false }, handler: Admin.organisationLicenceType },
  { method: 'POST', path: '/admin/organisation/{orgId}/licencetypes/{typeId}/field', config:{ auth: false }, handler: Admin.addFieldToOrganisationLicenceType }
]
