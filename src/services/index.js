const telegramUser = require('./telegram-user/telegram-user.service.js');
const spread = require('./spread/spread.service.js');
const users = require('./users/users.service.js');
const mail = require('./mail/mail.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(telegramUser);
  app.configure(spread);
  app.configure(users);
  app.configure(mail);
};
