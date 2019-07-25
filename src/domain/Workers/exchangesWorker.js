const bitMex = require('../Requests/RequestBitMEX')
const okexFutures = require('../Requests/RequestOkexFutures')
const okexSpot = require('../Requests/RequestOkexSpot')
const deribit = require('../Requests/RequestDeribit')
const bitFinex = require('../Requests/RequestBitfinex')

// const exchanges = ['bitFinex', 'Okex spot', 'Okex 1w', 'Okex 2w', 'Okex 3m', 'Bitmex Per']

module.exports = function (app) {
  let exchangesService = app.service('exchanges')
  const cryptos = ['BTC', 'ETH']
  setInterval(function () {
    insertExchange(bitMex, exchangesService, cryptos)
    insertExchange(okexFutures, exchangesService, cryptos)
    insertExchange(okexSpot, exchangesService, cryptos)
    insertExchange(deribit, exchangesService, cryptos)
    insertExchange(bitFinex, exchangesService, cryptos)
  }, 30000)
}
function insertExchange (exchange, exchangesService, cryptos) {
  cryptos.forEach(crypto => {
    exchange.lastPrice(crypto).then(res => {
      res.forEach(element => {
        exchangesService.create(element)
      })
    })
  })
}
