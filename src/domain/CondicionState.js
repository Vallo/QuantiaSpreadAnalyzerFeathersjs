const redis = require('./Helpers/redis.js');

class CondicionState {
  constructor(moneda) {
    this.state = Inicial;
    this.moneda = moneda;
  }

  async CumpleCondicion(spread) {
    let estado = this.state; //guardo el estado actual
    this.state = await this.state(spread, this.moneda);//llamo a CumpleCondicion de estado actual
    if (estado !== this.state) {
      console.log('cumple condicion ' + spread);
      return true;
    }//si el estado actual me cambió, hay que alertar
    return false;
  }
}

const Inicial = async function (spread, moneda) { //estado inicial, alerto si spread > Alert1
  let alarma = await redis.GetAlert1(moneda);
  console.log('alarma: ' + alarma + ' spread: ' + spread);
  if (spread > alarma) return SegundaCondicion;
  return Inicial;
};

const SegundaCondicion = async function (spread, moneda) { //segundo estado, alerto si spread > Alert2 o si spread tiende a 0
  let alarma = await redis.GetAlert2(moneda);
  console.log('alarma: ' + alarma + ' spread: ' + spread);
  if (spread < 1.005) return Inicial;
  if (spread > alarma) return TerceraCondicion;
  return SegundaCondicion;
};

const TerceraCondicion = async function (spread, moneda) { //tercer estado, alerto si spread > Alert3 o si spread tiende a 0
  let alarma = await redis.GetAlert3(moneda);
  console.log('alarma: ' + alarma + ' spread: ' + spread);
  if (spread < 1.005) return Inicial;
  if (spread > alarma) return CuartaCondicion;
  return TerceraCondicion;
};

const CuartaCondicion = async function (spread, moneda) { //cuarto estado, alerto si spread > Alert4 o si spread tiende a 0
  let alarma = await redis.GetAlert4(moneda);
  console.log('alarma: ' + alarma + ' spread: ' + spread);
  if (spread < 1.005) return Inicial;
  if (spread > alarma) return QuintaCondicion;
  return CuartaCondicion;
};

const QuintaCondicion = function (spread, moneda) { //ultimo estado, alerto sólo cuando el spread vuelva a 0
  console.log('alarma: 0 spread: ' + spread);
  if (spread < 1.005) return Inicial;
  return QuintaCondicion;
};
module.exports = CondicionState;
