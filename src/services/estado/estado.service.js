// Initializes the `estado` service on path `/estado`
const createService = require('feathers-sequelize');
const createModel = require('../../models/estado.model');
const hooks = require('./estado.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/estado', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('estado');

  service.hooks(hooks);
};
