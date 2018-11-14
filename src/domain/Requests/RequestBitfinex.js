const request = require('request');
const PromedioPonderado = require('../PromedioPonderado.js');

module.exports = {
  async GetPrices(moneda) {
    return await new Promise((resolve) => {
      request('https://api.bitfinex.com/v2/book/t' + moneda.toUpperCase() + 'USD/P0', {json: true}, async (err, res, body) => {
        if (err) {
          return console.log(err);
        }
        let promedio = new PromedioPonderado();
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
        promises.push(promedio.askAverage(moneda), await promedio.bidAverage(moneda));
        Promise.all(promises).then(res => {
          resolve({Ask: res[0], Bid: res[1], Exchange: 'Finex'});
        });
      });
    });
  }
};
