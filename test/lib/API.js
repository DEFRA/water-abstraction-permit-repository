'use strict'
require('dotenv').config()

// See Code API ref at https://github.com/hapijs/code/blob/HEAD/API.md

// requires for testing
const Code = require('code')

const expect = Code.expect
const Lab = require('lab')
const lab = exports.lab = Lab.script()

// use some BDD verbage instead of lab default
const describe = lab.describe
const it = lab.it
const after = lab.after



const API = require('../../src/lib/API.js')

var savedData={}



// test system fields
describe('API.system.getFields ', () => {
  it('should return an object', (done) => {
        // make API call to self to test functionality end-to-end
        API.system.getFields({}, (response) => {
          expect(response).to.exist()
          expect(response).to.be.a.object()
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})

// test org

describe('API.org.list ', () => {
  it('should return an object', (done) => {
        // make API call to self to test functionality end-to-end
        API.org.list({}, (response) => {
          expect(response).to.exist()
          expect(response).to.be.a.object()
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})

describe('API.org.get ', () => {
  it('should return an object', (done) => {
        // make API call to self to test functionality end-to-end
        API.org.get({params:{orgId:1}}, (response) => {
          expect(response).to.exist()
          expect(response).to.be.a.object()
          savedData.testOrg=response;
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})

describe('API.org.create ', () => {
  it('should return an object', (done) => {
        // make API call to self to test functionality end-to-end
        API.org.create({params:{org_nm:'Test Org'}}, (response) => {
          expect(response).to.exist()
          expect(response).to.be.a.object()
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})


describe('API.org.update ', () => {
  it('should return an object', (done) => {
        // make API call to self to test functionality end-to-end
        API.org.update({params:{org_id:savedData.testOrg.data.org_id},payload:{org_nm:savedData.testOrg.data.org_nm}}, (response) => {
          expect(response).to.exist()
          expect(response).to.be.a.object()
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})

describe('API.org.delete ', () => {
  it('should return an object', (done) => {
        // make API call to self to test functionality end-to-end
        API.org.delete({}, (response) => {
          expect(response).to.exist()
          expect(response).to.be.a.string()
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})

// test licenceType


describe('API.licenceType.list ', () => {
  it('should return an object', (done) => {
        // make API call to self to test functionality end-to-end
        var request={params:{orgId:savedData.testOrg.data[0].org_id}};
        API.licencetype.list(request, (response) => {
          expect(response).to.exist()
          expect(response).to.be.a.object()
          savedData.licenceType=response;
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})

describe('API.licenceType.create ', () => {
  it('should return an object', (done) => {
        // make API call to self to test functionality end-to-end
        var request={params:{orgId:savedData.testOrg.data[0].org_id},payload:{type_nm:'test licence type'}};
        API.licencetype.create(request, (response) => {
          expect(response).to.exist()
          expect(response).to.be.a.object()
          savedData.createLicenceType=response;
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})


describe('API.licenceType.get ', () => {
  it('should return an object', (done) => {
        // make API call to self to test functionality end-to-end
        var request={params:{orgId:savedData.testOrg.data[0].org_id,typeId:savedData.licenceType.data[0].type_id}};
        API.licencetype.get(request, (response) => {
          expect(response).to.exist()
          expect(response).to.be.a.object()
          savedData.licenceType=response;
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})

describe('API.licenceType.get ', () => {
  it('should return an object', (done) => {
        // make API call to self to test functionality end-to-end
        var request={params:{typeId:savedData.licenceType.data[0].type_id}};
        API.licencetype.getFields(request, (response) => {
          expect(response).to.exist()
          expect(response).to.be.a.object()
          savedData.licenceType=response;
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})


// test licence

describe('API.licence.list ', () => {
  it('should return an object', (done) => {
        // make API call to self to test functionality end-to-end
        var request={params:{orgId:savedData.testOrg.data[0].org_id,typeId:savedData.licenceType.data[0].type_id}};
        API.licence.list(request, (response) => {
          expect(response).to.exist()
          expect(response).to.be.a.object()
          savedData.testLicenceList=response;
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})

describe('API.licence.get ', () => {
  it('should return an object', (done) => {
        // make API call to self to test functionality end-to-end
        var request={params:{orgId:savedData.testOrg.data[0].org_id,typeId:savedData.licenceType.data[0].type_id,licenceId:savedData.testLicenceList.data[0].licence_id}}
        API.licence.get(request, (response) => {
          savedData.testLicence=response;
          expect(response).to.exist()
          expect(response).to.be.a.object()

          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})

describe('API.licence.create ', () => {
  it('should be rejected', (done) => {
        // make API call to self to test functionality end-to-end
        var request={params:{orgId:savedData.testOrg.data[0].org_id,typeId:savedData.licenceType.data[0].type_id},payload:savedData.testLicence}
        API.licence.create(request, (response) => {
          expect(response.error).to.exist()
          expect(response.error).to.be.a.array()
          expect(response.error[0]).to.equal('cannot post existing licence id')
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})

describe('API.licence.update ', () => {
  it('should be updated', (done) => {
        // make API call to self to test functionality end-to-end
        var request={params:{licenceId:savedData.testLicenceList.data[0].licence_id, orgId:savedData.testOrg.data[0].org_id,typeId:savedData.licenceType.data[0].type_id},payload:savedData.testLicence}
        API.licence.update(request, (response) => {
          expect(response).to.exist()
          expect(response).to.be.a.object()
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})


describe('API.licence.create ', () => {
  it('should be rejected', (done) => {
        // make API call to self to test functionality end-to-end


        var request={params:{orgId:savedData.testOrg.data[0].org_id,typeId:savedData.licenceType.data[0].type_id},payload:savedData.testLicence}
        delete request.payload.licence_id
        delete request.payload.licence_ref
        API.licence.create(request, (response) => {
          expect(response.error).to.exist()
          expect(response.error).to.be.a.array()
          expect(response.error[0]).to.equal('licence_ref must be defined')

          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})


describe('API.licence.create ', () => {
  it('should be rejected for no type id', (done) => {
        // make API call to self to test functionality end-to-end


        var request={params:{orgId:savedData.testOrg.data[0].org_id,typeId:savedData.licenceType.data[0].type_id},payload:savedData.testLicence}
        delete request.payload.licence_type_id
        request.payload.licence_ref='test'
        API.licence.create(request, (response) => {
          expect(response.error).to.exist()
          expect(response.error).to.be.a.array()
          expect(response.error[0]).to.equal('licence_type_id must be defined')

          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})


describe('API.licence.create ', () => {
  it('should be rejected for no org id', (done) => {
        // make API call to self to test functionality end-to-end


        var request={params:{orgId:savedData.testOrg.data[0].org_id,typeId:savedData.licenceType.data[0].type_id},payload:savedData.testLicence}
        delete request.payload.licence_org_id
        request.payload.licence_type_id=1
        console.log(request)
        API.licence.create(request, (response) => {
          console.log(response)
          expect(response.error).to.exist()
          expect(response.error).to.be.a.array()
          expect(response.error[0]).to.equal('licence_org_id must be defined')

          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})


describe('API.licence.create ', () => {
  it('should be created', (done) => {
        // make API call to self to test functionality end-to-end
        console.log(JSON.stringify(savedData.testLicence))
        var request={params:{orgId:savedData.testOrg.data[0].org_id,typeId:savedData.licenceType.data[0].type_id},payload:savedData.testLicence}
        delete request.payload.licence_id
        request.payload.licence_org_id=savedData.testOrg.data[0].org_id
        console.log(request.params)
        API.licence.create(request, (response) => {
          console.log(response)
          expect(response.error).to.not.exist()
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})


describe('API.licence.create ', () => {
  it('should be rejected for missing attribute', (done) => {
        // make API call to self to test functionality end-to-end


        var request={params:{orgId:savedData.testOrg.data[0].org_id,typeId:savedData.licenceType.data[0].type_id},payload:savedData.testLicence}
        delete request.payload.attributes.LicenceHolder
        request.payload.licence_type_id=1
        console.log(request)
        API.licence.create(request, (response) => {
          console.log(response)
          expect(response.error).to.exist()
          expect(response.error).to.be.a.array()
          expect(response.error[0]).to.equal('required attribute LicenceHolder was not supplied')

          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})

describe('API.licence.create ', () => {
  it('should be rejected for missing attribute', (done) => {
        // make API call to self to test functionality end-to-end


        var request={params:{orgId:savedData.testOrg.data[0].org_id,typeId:savedData.licenceType.data[0].type_id},payload:savedData.testLicence}
        request.payload.attributes.extraField='bob'
        request.payload.attributes.LicenceHolder='test'
        console.log(request)
        API.licence.create(request, (response) => {
          console.log(response)
          expect(response.error).to.exist()
          expect(response.error).to.be.a.array()
          expect(response.error[0]).to.equal('unknown attribute: extraField')

          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})

describe('API.licence.create ', () => {
  it('should be rejected for missing attribute', (done) => {
        // make API call to self to test functionality end-to-end


        var request={params:{orgId:savedData.testOrg.data[0].org_id,typeId:savedData.licenceType.data[0].type_id},payload:savedData.testLicence}
        delete request.payload.attributes.extraField
        request.payload.attributes.FlowConditions='not an array'
        console.log(request)
        API.licence.create(request, (response) => {
          console.log(response)
          expect(response.error).to.exist()
          expect(response.error).to.be.a.array()
          expect(response.error[0]).to.equal('array attribute FlowConditions was not an array')

          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})



describe('API.general.reset ', () => {
  it('should be an object', (done) => {
        // make API call to self to test functionality end-to-end
        API.general.reset({},(response) => {
          console.log(response)
          expect(response).to.be.an.object()
          done()
    })
  })

  after((done) => {
          // placeholder to do something post tests
    done()
  })
})
/*

system: {getFields: getFields},
org: {list: listOrgs, create: createOrg, delete: deleteOrg, get: getOrg, update: putOrg},
licencetype: {
  list: listLicenceTypes,
  create: createLicenceType,
  get: getLicenceType,
  getFields: getlicenceTypeFields

},
licence: {
  list: listLicences,
  create: createLicence,
  get: getLicence,
  update: putLicence

},
general: {
  reset: reset,
  test: test
}

*/
