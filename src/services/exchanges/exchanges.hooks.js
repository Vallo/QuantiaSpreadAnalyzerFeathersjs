const upsertServiceRecord = require('../../hooks/upsert')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [upsertServiceRecord({ service: 'exchanges', updateByKeys: ['crypto', 'exchange'] })],
    update: [],
    patch: [],
    remove: []
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
}
