var express = require('express');
var router = express.Router();
const BitFinexSpot = require('../domain/Requests/RequestBitfinex')
/* GET home page. */
router.post('/', function (req, res, next) {
    BitFinexSpot.GetPrices(req.body.crypto, req.body.weight).then(resp => {
        res.send(resp)
    })

});

module.exports = router;
