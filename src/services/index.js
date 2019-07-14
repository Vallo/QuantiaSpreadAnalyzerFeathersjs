const telegramUser = require('./telegram-user/telegram-user.service.js')
const users = require('./users/users.service.js')
const mail = require('./mail/mail.service.js')
const estado = require('./estado/estado.service.js')
const exchanges = require('./exchanges/exchanges.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(telegramUser)
  app.configure(users)
  app.configure(mail)
  app.configure(estado)
  app.configure(exchanges)
};
