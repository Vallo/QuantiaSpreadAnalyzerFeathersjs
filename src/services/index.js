const telegramUser = require('./telegram-user/telegram-user.service.js');
const cotizacion = require('./cotizacion/cotizacion.service.js');
const users = require('./users/users.service.js');
const mail = require('./mail/mail.service.js');
const estado = require('./estado/estado.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(telegramUser);
  app.configure(cotizacion);
  app.configure(users);
  app.configure(mail);
  app.configure(estado);
};
