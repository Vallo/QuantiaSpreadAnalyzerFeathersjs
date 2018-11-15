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

bot.onText(/\/setAlert1 [0-9]* [a-z]*$/, function onStartText(msg, match) {
  let array = match[0].split(' ');
  let alarma = array[1];
  let moneda = array[2];
  alarma = (alarma / 10000) + 1;
  redis.SetAlert1(moneda, alarma);
  bot.sendMessage(msg.chat.id, 'Nueva valor para ' + moneda + ' primer alarma: ' + alarma);
});

bot.onText(/\/setAlert2 [0-9]* [a-z]*$/, function onStartText(msg, match) {

  let array = match[0].split(' ');
  let alarma = array[1];
  let moneda = array[2];
  alarma = (alarma / 10000) + 1;
  redis.SetAlert2(moneda, alarma);
  bot.sendMessage(msg.chat.id, 'Nueva valor para ' + moneda + ' segunda alarma: ' + alarma);
});

bot.onText(/\/setWeight [0-9]* [a-z]*$/, function onStartText(msg, match) {

  let array = match[0].split(' ');
  let peso = array[1];
  let moneda = array[2];
  redis.SetWeight(moneda, peso);
  bot.sendMessage(msg.chat.id, 'Nueva valor para precio ponderado de ' + moneda + ': ' + peso);
});


bot.onText(/\/remove/, async function onStartText(msg) {
  db.Unregister(msg.chat.id);
  bot.sendMessage(msg.chat.id, 'Removido');
});

router.get('/', function (req, res) {
  res.sendStatus(200);
});
module.exports = router;

