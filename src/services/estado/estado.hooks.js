const {authenticate} = require('@feathersjs/authentication').hooks;
const {disallow, isNot, iff, isProvider} = require('feathers-hooks-common');

function isAdmin() {
  context => {
    if (context)
      if (context.params.user)
        return context.params.user.isAdmin;
    return false;
  };
  return true;
}


module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [disallow('external')],
    update: [disallow('external')],
    patch: [
      iff(isProvider('external'),
        iff(isNot(isAdmin), disallow())
      )
    ],
    remove: [disallow()]
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
