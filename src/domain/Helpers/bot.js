const app = require('../../app');
const TOKEN = app.get('token');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(TOKEN);
module.exports = {
  SendAlert(id, texto) {
    bot.sendMessage(id, texto);
  }
};
