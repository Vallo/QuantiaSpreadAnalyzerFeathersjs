'use strict'
const axios = require('axios')
const PromedioPonderado = require('../PromedioPonderado.js')
const _ = require('underscore')

let pareja = [
  {
    'moneda': 'btc',
    'bitmex': 'XBT'
  },
  {
    'moneda': 'eth',
    'bitmex': 'eth'
  }]

module.exports = {
  GetPrices (moneda) {
    let monedaBitMEX = pareja.find(symbol => symbol.moneda === moneda)
    if (!monedaBitMEX) return { Ask: 99999, Bid: 0, Exchange: 'BitMEX' }
    return new Promise((resolve, reject) => {
      axios.get('https://www.bitmex.com/api/v1/orderBook/L2?symbol=' + monedaBitMEX.bitmex.toUpperCase() + 'USD&depth=200').then(res => {
        let body = res.data
        let promedio = new PromedioPonderado()
        for (let i = 0, len = body.length; i < len; i++) {
          let row = body[i]
          if (row.side === 'Buy') {
            let bid = { Price: row.price, Amount: row.size / row.price }
            promedio.bid(bid)
          } else {
            let ask = { Price: row.price, Amount: row.size / row.price }
            promedio.ask(ask)
          }
        }
        let promises = []
        promises.push(promedio.askAverage(moneda), promedio.bidAverage(moneda))
        Promise.all(promises).then(res => {
          resolve({ Ask: res[0], Bid: res[1], Exchange: 'BitMEX' })
        })
      }).catch(err => reject(err))
    })
  },
  /* lastPrice (crypto) {
    return axios.get('https://www.bitmex.com/api/v1/instrument/active').then(res => {
      return _.map(_.filter(res.data, instrument => isMatch(instrument, crypto)), y => {
        return { exchange: getExchangeName(y.symbol), order: getOrder(y.symbol), crypto, lastPrice: getLastPrice(y) }
      })
    }).catch((e) => { Promise.resolve() })
  } */
  lastPrice (crypto) {
    return axios.get('https://www.bitmex.com/api/v1/instrument/active')
      .then(res => {
        const filteredList = _.filter(res.data, instrument => isMatch(instrument, crypto))
        const promises = _.map(filteredList, async (y) => {
          return {
            exchange: getExchangeName(y.symbol),
            order: getOrder(y.symbol),
            crypto,
            lastPrice: await getLastPrice(y)
          }
        })
        return Promise.all(promises)
      }).catch((e) => { Promise.resolve() })
  }
}

function getLastPrice (instrument) {
  const regex = /^(ETH)[FNGQHUJVKXZM]\d{2}$/
  let regexResult = regex.exec(instrument.symbol) || []
  if (regexResult.length > 0) {
    const app = require('../../app')
    return app.service('exchanges').find({
      query: {
        exchange: 'BMEXperp',
        crypto: 'BTC'
      }
    }).then(res => {
      if (res.total === 0) {
        return 0
      }
      return res.data[0].lastPrice * instrument.lastPrice
    })
  } else {
    return instrument.lastPrice
  }
}

function getOrder (symbol) {
  return symbol.includes('USD') ? 10 : 6
}

function getMonth (symbol) {
  return symbol.charAt(3)
}

function isMatch (instrument, crypto) {
  let symbol = instrument.symbol
  const regex = crypto === 'BTC' ? /^(XBT)[FNGQHUJVKXZM]\d{2}$|(XBTUSD)/ : /^(ETH)[FNGQHUJVKXZM]\d{2}$|(ETHUSD)/
  return regex.exec(symbol) && regex.exec(symbol).length > 0
}

function getExchangeName (symbol) {
  if (symbol.includes('USD')) {
    return 'BMEXperp'
  }
  let month = getMonth(symbol)
  switch (month) {
    case 'F':
      return 'BMEXJan'
    case 'N':
      return 'BMEXJul'
    case 'G':
      return 'BMEXFeb'
    case 'Q':
      return 'BMEXAug'
    case 'H':
      return 'BMEXMar'
    case 'U':
      return 'BMEXSep'
    case 'J':
      return 'BMEXApr'
    case 'V':
      return 'BMEXOct'
    case 'K':
      return 'BMEXMay'
    case 'X':
      return 'BMEXNov'
    case 'M':
      return 'BMEXJun'
    case 'Z':
      return 'BMEXDec'
  }
}
