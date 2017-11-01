/*

API operations only - NO UI

*/

const IDM = require('../lib/IDM')
const version = '1.0'

module.exports = [
  { method: 'POST', path: '/idm/' + version + '/user', handler: IDM.createUser , config:{description:'Create a new user in IDM'}},
  { method: 'PUT', path: '/idm/' + version + '/user', handler: IDM.updatePassword , config:{description:'TODO:'}},
  { method: 'POST', path: '/idm/' + version + '/changePassword', handler: IDM.changePasswordWithResetLink, config:{description:'TODO:'} },
  { method: 'POST', path: '/idm/' + version + '/resetPassword', handler: IDM.resetPassword, config:{description:'TODO:'} },
  { method: 'GET', path: '/idm/' + version + '/resetPassword', handler: IDM.getResetPasswordGuid, config:{description:'TODO:'} },
  { method: 'POST', path: '/idm/' + version + '/user/login',   handler: IDM.loginUser, config:{description:'TODO:'} },
  { method: 'POST', path: '/idm/' + version + '/user/loginAdmin',   handler: IDM.loginAdminUser , config:{description:'TODO:'}},
  { method: 'GET', path: '/idm/' + version + '/user/{user_id}', handler: IDM.getUser, config:{description:'TODO:'} },
  { method: 'POST', path: '/idm/' + version + '/user/{user_id}/addLicence', handler: IDM.addLicenceToUser , config:{description:'TODO:'}}
]
