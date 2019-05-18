const axios = require('axios');
const PromedioPonderado = require('../PromedioPonderado.js');

module.exports = {
  GetPrices(moneda, contract,weight) {
    return new Promise((resolve, reject) => {
      axios.get('https://www.okex.com/api/v1/future_depth.do?symbol=' + moneda.toLowerCase() + '_usd&contract_type=' + contract + '&size=40').then(res => {
        let body = res.data;
        let contractSize = 10;
        if (moneda.toLowerCase() === 'btc') contractSize = 100;
        let promedio = new PromedioPonderado(weight);
        if (!body) {
          console.log('NO BODY?');
          return {Ask: 99999, Bid: 0, Exchange: 'Okex Futures'};
        }
        let bids = body.bids;
        for (let i = 0, len = bids.length; i < len; i++) {
          let row = bids[i];
          let bid = {Price: row[0], Amount: (row[1] * contractSize) / row[0]};
          promedio.bid(bid);
        }
        let asks = body.asks;
        for (let i = 0, len = asks.length; i < len; i++) {
          let row = asks[i];
          let ask = {Price: row[0], Amount: (row[1] * contractSize) / row[0]};
          promedio.ask(ask);
        }
        let promises = [];
        promises.push(promedio.askAverage(moneda), promedio.bidAverage(moneda));
        Promise.all(promises).then(res => {
          resolve({Ask: res[0], Bid: res[1], Exchange: 'Okex Futures ' + contract});
        });
      }).catch(err => reject(err));
    });
  }
};
