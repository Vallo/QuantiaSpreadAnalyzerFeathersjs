// Initializes the `exchanges` service on path `/exchanges`
const createService = require('feathers-memory')
const hooks = require('./exchanges.hooks')

module.exports = function (app) {
  const paginate = app.get('paginate')

  const options = {
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/exchanges', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('exchanges')

  service.hooks(hooks)
}
