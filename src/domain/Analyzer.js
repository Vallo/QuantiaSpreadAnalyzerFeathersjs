const OkexSpot = require('./Requests/RequestOkexSpot.js');
const OkexFutures = require('./Requests/RequestOkexFutures.js');
const HuboiSpot = require('./Requests/RequestHuobi.js');
const BitFinexSpot = require('./Requests/RequestBitfinex.js');
const estadoService = require('./../app').service('estado');

module.exports = {
    async GetSpread(moneda) {
        let prices = [];
        return await new Promise((resolve, reject) => {
            getAllPrices(moneda).then(function (result) {
                //console.log(result);
                prices.push(result);
                prices = prices[0];
                let minAsk = Math.min(...prices.map(d => d.Ask));
                let maxBid = Math.max(...prices.map(d => d.Bid));
                let minExchange = prices.find(x => x.Ask == minAsk);
                let maxExchange = prices.find(x => x.Bid == maxBid);
                /*
                                console.log('\nMenor Ask: ' + minExchange.Exchange + '--> ' + minExchange.Ask);
                                console.log('Mayor Bid: ' + maxExchange.Exchange + '--> ' + maxExchange.Bid);
                                console.log('Spread: ' + maxExchange.Bid/minExchange.Ask)*/
                estadoService.patch(moneda, {
                    minAsk,
                    maxBid,
                    minExchange: minExchange.Exchange,
                    maxExchange: maxExchange.Exchange
                })
                resolve({ MinExchange: minExchange, MaxExchange: maxExchange, Moneda: moneda });
            }).catch(() => {});
        });
    }
}

async function GetSpreadString(moneda) {
    return await new Promise(async (resolve, reject) => {
        let retorno = await Spread(moneda);
        resolve('\nMenor Ask: ' + retorno.MinExchange.Exchange + '--> ' + retorno.MinExchange.Ask + '\nMayor Bid: ' + retorno.MaxExchange.Exchange + '--> ' + retorno.MaxExchange.Bid + '\nSpread: ' + retorno.MaxExchange.Bid / retorno.MinExchange.Ask);
    });
}
async function getAllPrices(moneda) {
    let weight = await estadoService.get(moneda).then(res => {
        return res.weight;
    });
    return Promise.all([
        OkexSpot.GetPrices(moneda, weight),
        HuboiSpot.GetPrices(moneda, weight),
        BitFinexSpot.GetPrices(moneda, weight),
        OkexFutures.GetPrices(moneda, 'this_week', weight),
        OkexFutures.GetPrices(moneda, 'next_week', weight),
        OkexFutures.GetPrices(moneda, 'quarter', weight)])
}

