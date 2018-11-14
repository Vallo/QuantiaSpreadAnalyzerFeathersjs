// Initializes the `mail` service on path `/mail`
const createService = require('feathers-sequelize');
const createModel = require('../../models/mail.model');
const hooks = require('./mail.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/mail', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('mail');

  service.hooks(hooks);
};
