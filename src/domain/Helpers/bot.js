const TelegramBot = require('node-telegram-bot-api')
module.exports = function (app) {
  const token = app.get('token')
  const bot = new TelegramBot(token)
  app.set('bot', bot)
  app.on('sendAlert', async (texto) => {
    let telegramUsers = (await app.service('telegram-user').find()).data
    telegramUsers.forEach(telegramUser => {
      bot.sendMessage(telegramUser.id, texto)
    })
  })
}
