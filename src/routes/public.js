module.exports = [

  {
    method: 'GET',
    path: '/public/{param*}', config:{ auth: false },
    handler: {
      directory: {
        path: 'public/',
        listing: true

      }
    }
  }

]
