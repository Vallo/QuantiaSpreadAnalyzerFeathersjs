var express = require('express');
var router = express.Router();
const BitFinexSpot = require('../domain/Requests/RequestBitfinex')
const BitMex = require('../domain/Requests/RequestBitMEX')
const Houbi = require('../domain/Requests/RequestHuobi')
const OkexFutures = require('../domain/Requests/RequestOkexFutures')
const OkexSpot = require('../domain/Requests/RequestOkexSpot')
/* GET home page. */

/*
1: Finex
2: Okex Spot
3: Okex 1w
4: Okex 2w
5: Okex 3m
6: Houbi
7: Bitmex
 */
router.post('/', function (req, res, next) {
    switch (req.body.exchange) {
        case 1:
            BitFinexSpot.GetPrices(req.body.crypto, req.body.weight).then(resp => {
                res.send(resp)
            })
            break;
        case 2:
            OkexSpot.GetPrices(req.body.crypto, req.body.weight).then(resp => {
                res.send(resp)
            })
            break;
        case 3:
            OkexFutures.GetPrices(req.body.crypto, "this_week", req.body.weight).then(resp => {
                res.send(resp)
            })
            break;
        case 4:
            OkexFutures.GetPrices(req.body.crypto,"next_week",  req.body.weight).then(resp => {
                res.send(resp)
            })
            break;
        case 5:
            OkexFutures.GetPrices(req.body.crypto,"quarter",  req.body.weight).then(resp => {
                res.send(resp)
            })
            break;
        case 6:
            Houbi.GetPrices(req.body.crypto, req.body.weight).then(resp => {
                res.send(resp)
            })
            break;
        case 7:
            BitMex.GetPrices(req.body.crypto, req.body.weight).then(resp => {
                res.send(resp)
            })
            break;

    }

});

module.exports = router;
