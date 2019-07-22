const axios = require('axios')
const _ = require('underscore')
module.exports = {
  lastPrice (crypto) {
    const url = 'https://www.deribit.com/api/v2/public/get_book_summary_by_currency?currency=' + crypto + '&kind=future'
    return axios.get(url).then(res => {
      return _.map(res.data.result, y => {
        return { exchange: 'Deribit ' + y.instrument_name, crypto, symbol: y.instrument_name, lastPrice: y.last }
      })
    })
  }
}
