const axios = require('axios');
const PromedioPonderado = require('../PromedioPonderado.js');

module.exports = {
  GetPrices(moneda,weight) {
    return new Promise((resolve, reject) => {
      axios.get('https://www.okex.com/api/v1/depth.do?symbol=' + moneda.toLowerCase() + '_usdt').then(res => {
        let body = res.data;
        let promedio = new PromedioPonderado(weight);
        let bids = body.bids;
        for (let i = 0, len = bids.length; i < len; i++) {
          let row = bids[i];
          let bid = {Price: row[0], Amount: row[1]};
          promedio.bid(bid);
        }
        let asks = body.asks;
        for (let i = 0, len = asks.length; i < len; i++) {
          let row = asks[i];
          let ask = {Price: row[0], Amount: row[1]};
          promedio.ask(ask);
        }

        let promises = [];
        promises.push(promedio.askAverage(moneda), promedio.bidAverage(moneda));
        Promise.all(promises).then(res => {
          resolve({Ask: res[0], Bid: res[1], Exchange: 'Okex Spot'});
        });
      }).catch(err => reject(err));
    });
  }
};
