const config = require('../../config.js')
const TOKEN = config.token;
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(TOKEN);
var exports = module.exports = {};
exports.SendAlert = function(id, texto){
	bot.sendMessage(id, texto);
}
