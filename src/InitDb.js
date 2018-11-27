const app = require('./app');
module.exports = {
  Init(crypto) {
    app.service('estado').find({
      query: {
        crypto
      }}).then(res => {
      if (res.total === 0) {
        app.service('estado').create({
          crypto: crypto,
          spread: 0,
          alertState: 'Inicial',
          weight: 10,
          Alert1: 1,
          Alert2: 1.01,
          Alert3: 1.02,
          Alert4: 1.03
        });
      }
    });
  }
};
