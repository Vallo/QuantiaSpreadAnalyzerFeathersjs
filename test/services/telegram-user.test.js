const assert = require('assert');
const app = require('../../src/app');

describe('\'telegram-user\' service', () => {
  it('registered the service', () => {
    const service = app.service('telegram-user');

    assert.ok(service, 'Registered the service');
  });
});
