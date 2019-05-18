'use strict';
const axios = require('axios');
const PromedioPonderado = require('../PromedioPonderado.js');


let pareja = [
  {
    'moneda': 'btc',
    'bitmex': 'XBT'
  },
  {
    'moneda': 'eth',
    'bitmex': 'eth'
  }];

module.exports = {
  GetPrices(moneda) {
    let monedaBitMEX = pareja.find(x => x.moneda === moneda);
    if (!monedaBitMEX) return {Ask: 99999, Bid: 0, Exchange: 'BitMEX'};
    return new Promise((resolve, reject) => {
      axios.get('https://www.bitmex.com/api/v1/orderBook/L2?symbol=' + monedaBitMEX.bitmex.toUpperCase() + 'USD&depth=200').then(res => {
        let body = res.data;
        let promedio = new PromedioPonderado();
        for (let i = 0, len = body.length; i < len; i++) {
          let row = body[i];
          if (row.side === 'Buy') {
            let bid = {Price: row.price, Amount: row.size / row.price};
            promedio.bid(bid);
          }
          else {
            let ask = {Price: row.price, Amount: row.size / row.price};
            promedio.ask(ask);
          }
        }
        let promises = [];
        promises.push(promedio.askAverage(moneda), promedio.bidAverage(moneda));
        Promise.all(promises).then(res => {
          resolve({Ask: res[0], Bid: res[1], Exchange: 'BitMEX'});
        });
      }).catch(err => reject(err));
    });
  }
};
