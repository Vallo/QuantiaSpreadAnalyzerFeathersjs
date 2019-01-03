let express = require('express');
let router = express.Router();
const app = require('../app');
const TOKEN = app.get('token');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(TOKEN);
const Analyzer = require('../domain/Analyzer.js');
const db = require('../domain/Helpers/db.js');
const redis = require('../domain/Helpers/redis.js');

router.post(`/${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.onText(/\/spread/, async function onStartText(msg) {
  bot.sendMessage(msg.chat.id, await Analyzer.GetSpreadString('btc'));
});

bot.onText(/\/spreadEth/, async function onStartText(msg) {
  bot.sendMessage(msg.chat.id, await Analyzer.GetSpreadString('eth'));
});

bot.onText(/\/register/, async function onStartText(msg) {
  db.Register(msg.chat.id, msg.chat.first_name);
  bot.sendMessage(msg.chat.id, 'Registrado correctamente');
});


bot.onText(/\/remove/, async function onStartText(msg) {
  db.Unregister(msg.chat.id);
  bot.sendMessage(msg.chat.id, 'Removido');
});

router.get('/', function (req, res) {
  res.sendStatus(200);
});
module.exports = router;

