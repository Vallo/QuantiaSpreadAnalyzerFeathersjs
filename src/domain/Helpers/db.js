let exports = module.exports = {};
const app = require('../../app.js');
const telegramUserService = app.service('telegram-user');

exports.Register = function (id, nombre) {
  telegramUserService.create({id, nombre});
};


exports.Unregister = function (id) {
  telegramUserService.remove(id);
};

exports.GetSuscripciones = function () {
  return telegramUserService.find();
};
