const assert = require('assert');
const app = require('../../src/app');

describe('\'cotizacion\' service', () => {
  it('registered the service', () => {
    const service = app.service('cotizacion');

    assert.ok(service, 'Registered the service');
  });
});
