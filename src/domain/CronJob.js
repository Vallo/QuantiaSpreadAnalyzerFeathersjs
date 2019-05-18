//const bot = require('./Helpers/bot.js'); TODO
const Analyzer = require('./Analyzer.js');
const db = require('./Helpers/db.js');
const mailService = require('../app').service('mail');
const condicionState = require('./CondicionState.js');
const mailSender = require('./Helpers/mailSender.js');

async function Job(moneda, condicion) {
    let res = await Analyzer.GetSpread(moneda);
    let spread = res.MaxExchange.Bid / res.MinExchange.Ask;
    //console.log('Spread: ' + spread + ' Moneda: ' + moneda);
    if (await condicion.CumpleCondicion(spread)) {
        let ids = await db.GetSuscripciones();
        let mensaje = 'Moneda: ' + moneda + '\nSpread: ' + spread.toFixed(5) + '\nMenor Ask: ' + res.MinExchange.Exchange + '--> ' + res.MinExchange.Ask + '\nMayor Bid: ' + res.MaxExchange.Exchange + '--> ' + res.MaxExchange.Bid;
        for (let i = 0, len = ids.length; i < len; i++) {
            //bot.SendAlert(ids[i].id, mensaje);
        }
        mailService.find().then(mails => {
            if (mails.data[0]) {
                let mailOptions = mailSender.mailOptions(moneda, mensaje, mails.data);
                mailSender.sendMail(mailOptions);
            }
        });
    }
}

/*
    Finex:          BTC LTC ETH ETC EOS XRP BCH BTG
    Bitmex:         BTC     ETH
    Huobi:          BTC LTC ETH ETC EOS XRP BCH
    Okex Spot:      BTC LTC ETH ETC EOS XRP BCH BTG
    Okex futuros:   BTC LTC ETH ETC EOS XRP BCH BTG
*/

exports.Start = function () {
    //BTC LTC ETH ETC EOS XRP BCH BTG
    const intervalo = 30000;
    let condicionBTC = new condicionState('btc');
    let condicionETH = new condicionState('eth');
    let condicionLTC = new condicionState('ltc');
    let condicionETC = new condicionState('etc');
    let condicionEOS = new condicionState('eos');
    let condicionXRP = new condicionState('xrp');
    //  let condicionBCH = new condicionState('bch');
    //  let condicionBTG = new condicionState('btg');

    setInterval(function () {
        Job('btc', condicionBTC);
    }, intervalo);
    setInterval(function () {
        Job('eth', condicionETH);
    }, intervalo);
    setInterval(function () {
        Job('ltc', condicionLTC);
    }, intervalo);
    setInterval(function () {
        Job('etc', condicionETC);
    }, intervalo);
    setInterval(function () {
        Job('eos', condicionEOS);
    }, intervalo);/*
      setInterval(function () {
        Job('bch', condicionBCH);
      }, intervalo);
      setInterval(function () {
        Job('btg', condicionBTG);
      }, intervalo);*/
    setInterval(function () {
        Job('xrp', condicionXRP);
    }, intervalo);
};
