const redis = require('./Helpers/redis.js');

class PromedioPonderado {
  constructor() {
    this._bid = [];
    this._ask = [];
  }

  bid(bid) {
    this._bid.push(bid);
  }

  ask(ask) {
    this._ask.push(ask);
  }

  async bidAverage(moneda) {
    this._bid.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
    let totalAmount = 0;
    let i = 0;
    let average = 0;
    let weight = await redis.GetWeight(moneda);
    while (totalAmount < weight) {
      console.log('Bid: ' + this._bid[i].Amount + '->' + this._bid[i].Price + ' = ' + totalAmount);
      totalAmount = totalAmount + this._bid[i].Amount; //undefined si no llego al totalAmount con el order book que recibí
      average = average + (this._bid[i].Price * this._bid[i].Amount);
      i++;
    }
    average = average / (totalAmount);
    //console.log("Precio promedio para comprar " + weight + " BTC: " + average);
    return average.toFixed(2);
  }

  async askAverage(moneda) {
    this._ask.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
    let totalAmount = 0;
    let i = 0;
    let average = 0;
    let weight = await redis.GetWeight(moneda);
    while (totalAmount < weight) {
      console.log('Ask: ' + this._ask[i].Amount + '->' + this._ask[i].Price + ' = ' + totalAmount);
      totalAmount = totalAmount + this._ask[i].Amount;
      average = average + (this._ask[i].Price * this._ask[i].Amount);
      i++;
    }
    average = average / (totalAmount);
    //console.log("Precio promedio para vender 10 BTC: " + average);
    return average.toFixed(2);
  }
}

module.exports = PromedioPonderado;
