module.exports = function (app) {
  const bot = app.get('bot')
  app.post(`/bot/${bot.token}`, (req, res) => {
    bot.processUpdate(req.body)
    res.sendStatus(200)
  })
  app.get('/bot', function (req, res) {
    res.sendStatus(200)
  })
  /*
  bot.onText(/\/spread/, async function onStartText (msg) {
    bot.sendMessage(msg.chat.id, await Analyzer.GetSpreadString('btc'))
  })

  bot.onText(/\/spreadEth/, async function onStartText (msg) {
    bot.sendMessage(msg.chat.id, await Analyzer.GetSpreadString('eth'))
  }) */

  bot.onText(/\/register/, async function onStartText (msg) {
    app.service('telegram-user').create({ id: msg.chat.id, nombre: msg.chat.first_name })
    bot.sendMessage(msg.chat.id, 'Registrado correctamente')
  })

  bot.onText(/\/remove/, async function onStartText (msg) {
    app.service('telegram-user').remove(msg.chat.id)
    bot.sendMessage(msg.chat.id, 'Removido')
  })
}
