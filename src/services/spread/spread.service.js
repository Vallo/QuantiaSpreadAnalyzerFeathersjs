// Initializes the `spread` service on path `/spread`
const createService = require('feathers-sequelize');
const createModel = require('../../models/spread.model');
const hooks = require('./spread.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/spread', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('spread');

  service.hooks(hooks);
};
