const axios = require('axios');
const PromedioPonderado = require('../PromedioPonderado.js');

module.exports = {
  async GetPrices(moneda, weight) {
    return await new Promise((resolve) => {
      axios.get('https://api.bitfinex.com/v2/book/t' + moneda.toUpperCase() + 'USD/P1?len=100').then(res => {
        let body = res.data;
        let promedio = new PromedioPonderado(weight);
        for (let i = 0, len = body.length; i < len; i++) {
          let row = body[i];
          if (row[2] > 0) {
            let bid = {Price: row[0], Amount: row[2]};
            promedio.bid(bid);
          }
          else {
            let ask = {Price: row[0], Amount: -row[2]};
            promedio.ask(ask);
          }
        }
        let promises = [];
        promises.push(promedio.askAverage(moneda), promedio.bidAverage(moneda));
        Promise.all(promises).then(res => {
          resolve({Ask: res[0], Bid: res[1], Exchange: 'Finex'});
        });
      }).catch(() => {
        resolve({Ask: 99999, Bid: 0, Exchange: 'Bitfinex'});
      });
    });
  }
};
