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
          alert1: 1,
          alert2: 1.01,
          alert3: 1.02,
          alert4: 1.03
        });
      }
    });
  }
};
