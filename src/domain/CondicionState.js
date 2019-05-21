const app = require('../app')
const estadoService = app.service('estado')

class CondicionState {
  constructor (moneda) {
    this.state = Inicial
    this.moneda = moneda
  }

  async CumpleCondicion (spread) {
    let estado = this.state // guardo el estado actual
    this.state = await this.state(spread, this.moneda)// llamo a CumpleCondicion de estado actual
    let nuevoEstado = this.state
    estadoService.patch(this.moneda, { spread, alertState: nuevoEstado.name }).catch(err => console.log(err))
    if (estado !== this.state) {
      return true
    }// si el estado actual me cambió, hay que alertar
    return false
  }
}

const Inicial = async function (spread, moneda) { // estado inicial, alerto si cotizacion > alert1
  let alarma = await estadoService.get(moneda).then(res => {
    return res.alert1
  })
  if (spread > alarma) return SegundaCondicion
  return Inicial
}

const SegundaCondicion = async function (spread, moneda) { // segundo estado, alerto si cotizacion > alert2 o si cotizacion tiende a 0
  let alarma = await estadoService.get(moneda).then(res => {
    return res.alert2
  })
  if (spread < 1.005) return Inicial
  if (spread > alarma) return TerceraCondicion
  return SegundaCondicion
}

const TerceraCondicion = async function (spread, moneda) { // tercer estado, alerto si cotizacion > alert3 o si cotizacion tiende a 0
  let alarmaPrevia = await estadoService.get(moneda).then(res => {
    return res.alert2
  })
  let alarmaActual = await estadoService.get(moneda).then(res => {
    return res.alert3
  })
  if (spread < alarmaPrevia) return SegundaCondicion
  if (spread > alarmaActual) return CuartaCondicion
  return TerceraCondicion
}

const CuartaCondicion = async function (spread, moneda) { // cuarto estado, alerto si cotizacion > alert4 o si cotizacion tiende a 0
  let alarmaPrevia = await estadoService.get(moneda).then(res => {
    return res.alert3
  })
  let alarmaActual = await estadoService.get(moneda).then(res => {
    return res.alert4
  })
  if (spread < alarmaPrevia) return TerceraCondicion
  if (spread > alarmaActual) return QuintaCondicion
  return CuartaCondicion
}

const QuintaCondicion = async function (spread, moneda) { // ultimo estado, alerto sólo cuando el cotizacion vuelva a 0
  let alarmaPrevia = await estadoService.get(moneda).then(res => {
    return res.alert4
  })
  if (spread < alarmaPrevia) return CuartaCondicion
  return QuintaCondicion
}
module.exports = CondicionState
