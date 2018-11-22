const axios = require('axios');
const PromedioPonderado = require('../PromedioPonderado.js');

module.exports = {
  async GetPrices(moneda) {
    if (moneda === 'btg') {
      return {Ask: 99999, Bid: 0, Exchange: 'Houbi'};
    }
    return await new Promise((resolve, reject) => {
      axios.get('https://api.huobi.pro/market/depth?symbol=' + moneda.toLowerCase() + 'usdt&type=step0').then(res => {
        let body = res.data;
        let promedio = new PromedioPonderado();
        let bids = body.tick.bids;
        for (let i = 0, len = bids.length; i < len; i++) {
          let row = bids[i];
          let bid = {Price: row[0], Amount: row[1]};
          promedio.bid(bid);
        }
        let asks = body.tick.asks;
        for (let i = 0, len = asks.length; i < len; i++) {
          let row = asks[i];
          let ask = {Price: row[0], Amount: row[1]};
          promedio.ask(ask);
        }
        let promises = [];
        promises.push(promedio.askAverage(moneda), promedio.bidAverage(moneda));
        Promise.all(promises).then(res => {
          resolve({Ask: res[0], Bid: res[1], Exchange: 'Huobi'});
        });
      }).catch(() => {
        resolve({Ask: 99999, Bid: 0, Exchange: 'Huobi'});
      });
    });
  }
};
