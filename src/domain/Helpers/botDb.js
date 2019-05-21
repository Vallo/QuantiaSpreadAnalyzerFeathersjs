let app
module.exports = {
  Init (app_) {
    app = app_
  },
  Register (id, nombre) {
    app.service('telegram-user').create({ id, nombre })
  },
  Unregister (id) {
    app.service('telegram-user').remove(id)
  },
  GetSuscripciones () {
    return app.service('telegram-user').find()
  }
}
