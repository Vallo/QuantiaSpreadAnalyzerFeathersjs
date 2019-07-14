const assert = require('assert');
const app = require('../../src/app');

describe('\'exchanges\' service', () => {
  it('registered the service', () => {
    const service = app.service('exchanges');

    assert.ok(service, 'Registered the service');
  });
});
