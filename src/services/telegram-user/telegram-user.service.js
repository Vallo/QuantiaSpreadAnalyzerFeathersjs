// Initializes the `telegram-user` service on path `/telegram-user`
const createService = require('feathers-sequelize');
const createModel = require('../../models/telegram-user.model');
const hooks = require('./telegram-user.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/telegram-user', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('telegram-user');

  service.hooks(hooks);
};
