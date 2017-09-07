/*
API page, pending real back end - uses fs to read and write to lkocal json files...

*/

const IDM = require('../lib/IDM')
const version = '1.0'

module.exports = [
  { method: 'POST', path: '/idm/' + version + '/user', handler: IDM.createUser },
  { method: 'POST', path: '/idm/' + version + '/user/login',   handler: IDM.loginUser },
  { method: 'GET', path: '/idm/' + version + '/user/{user_id}', handler: IDM.getUser },
  { method: 'POST', path: '/idm/' + version + '/user/{user_id}/addLicence', handler: IDM.addLicenceToUser }
]