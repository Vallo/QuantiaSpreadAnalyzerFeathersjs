const assert = require('assert');
const app = require('../../src/app');

describe('\'spread\' service', () => {
  it('registered the service', () => {
    const service = app.service('spread');

    assert.ok(service, 'Registered the service');
  });
});
