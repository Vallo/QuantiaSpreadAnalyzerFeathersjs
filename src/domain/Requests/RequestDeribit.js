const axios = require('axios')
const _ = require('underscore')
module.exports = {
  lastPrice (crypto) {
    const url = 'https://www.deribit.com/api/v2/public/get_book_summary_by_currency?currency=' + crypto + '&kind=future'
    return axios.get(url).then(res => {
      return _.map(res.data.result, y => {
        return { exchange: getExchangeName(y.instrument_name), order: getOrder(y.instrument_name), crypto, lastPrice: y.last }
      })
    }).catch()
  }
}

function getExchangeName (symbol) {
  if (symbol.includes('PERPETUAL')) {
    return 'DBperp'
  }
  return 'DB' + symbol.substring(6, 9).toLowerCase()
}

function getOrder (symbol) {
  return symbol.includes('PERPETUAL') ? 11 : 8
}
