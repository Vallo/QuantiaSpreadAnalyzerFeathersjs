// Initializes the `cotizacion` service on path `/cotizacion`
const createService = require('feathers-sequelize');
const createModel = require('../../models/cotizacion.model');
const hooks = require('./cotizacion.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/cotizacion', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('cotizacion');

  service.hooks(hooks);
};
