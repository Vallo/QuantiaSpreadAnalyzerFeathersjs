let redis = require('promise-redis')();
let client = redis.createClient();
const feathers = require('../../app');
module.exports = {/*
  SetAlert1(moneda, value) {
    client.set('Alert1:' + moneda, value);
  },
  SetAlert2(moneda, value) {
    client.set('Alert2:' + moneda, value);
  },
  SetWeight(moneda, value) {
    client.set('Weight:' + moneda, value);
    feathers.service('estado').update(moneda, {weight:value});
  }*/
};
