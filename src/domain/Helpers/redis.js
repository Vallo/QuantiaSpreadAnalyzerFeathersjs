let redis = require("promise-redis")();
let client = redis.createClient();
const config = require('../../config.js');
module.exports = {
    GetAlert1(moneda) {
        return client.get("Alert1:" + moneda);
    },

    SetAlert1(moneda, value) {
        client.set("Alert1:" + moneda, value);
    },

    GetAlert2(moneda,) {
        return client.get("Alert2:" + moneda);
    },

    SetAlert2(moneda, value) {
        client.set("Alert2:" + moneda, value);
    },
    GetAlert3(moneda,) {
        return client.get("Alert3:" + moneda);
    },

    SetAlert3(moneda, value) {
        client.set("Alert3:" + moneda, value);
    },
    GetAlert4(moneda,) {
        return client.get("Alert4:" + moneda);
    },

    SetAlert4(moneda, value) {
        client.set("Alert4:" + moneda, value);
    },

    GetPrice(moneda) {
        return client.get("Price:" + moneda);
    },

    SetPrice(moneda, value) {
        client.set("Price:" + moneda, value);
    },

    GetWeight(moneda) {
        return client.get("Weight:" + moneda);
    },

    SetWeight(moneda, value) {
        client.set("Weight:" + moneda, value);
    }
};