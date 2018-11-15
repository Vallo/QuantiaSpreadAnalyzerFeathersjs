const app = require('../../app.js');
const telegramUserService = app.service('telegram-user');


module.exports = {
  Register(id, nombre) {
    telegramUserService.create({id, nombre});
  },
  Unregister(id) {
    telegramUserService.remove(id);
  },
  GetSuscripciones() {
    return telegramUserService.find();
  }
}
