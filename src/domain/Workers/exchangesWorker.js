const bitMex = require('../Requests/RequestBitMEX')
const okexFutures = require('../Requests/RequestOkexFutures')
const okexSpot = require('../Requests/RequestOkexSpot')
const deribit = require('../Requests/RequestDeribit')
const bitFinex = require('../Requests/RequestBitfinex')

// const exchanges = ['bitFinex', 'Okex spot', 'Okex 1w', 'Okex 2w', 'Okex 3m', 'Bitmex Per']

module.exports = function (app) {
  let exchangesService = app.service('exchanges')
  const crypto = 'ETH'
  setInterval(function () {
    insertExchange(bitMex, exchangesService, crypto)
    insertExchange(okexFutures, exchangesService, crypto)
    insertExchange(okexSpot, exchangesService, crypto)
    insertExchange(deribit, exchangesService, crypto)
    insertExchange(bitFinex, exchangesService, crypto)
  }, 3000)
}
function insertExchange (exchange, exchangesService, crypto) {
  exchange.lastPrice(crypto).then(res => {
    res.forEach(element => {
      exchangesService.create(element)
    })
  })
}
