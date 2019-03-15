class PromedioPonderado {
    constructor(weight) {
        this._bid = [];
        this._ask = [];
        this._weight = weight;
    }

    bid(bid) {
        this._bid.push(bid);
    }

    ask(ask) {
        this._ask.push(ask);
    }

    async bidAverage(moneda) {
        this._bid.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
        let totalAmount = 0;
        let i = 0;
        let average = 0;
        while (totalAmount < this._weight) {
            if (this._bid[i]) {
                totalAmount = totalAmount + this._bid[i].Amount; //undefined si no llego al totalAmount con el order book que recibí
                average = average + (this._bid[i].Price * this._bid[i].Amount);
                i++;
            }
            else break;
        }
        average = average / totalAmount;
        return average.toFixed(5);
    }

    async askAverage(moneda) {
        this._ask.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
        let totalAmount = 0;
        let i = 0;
        let average = 0;
        while (totalAmount < this._weight) {
            if (this._ask[i]) {
                totalAmount = totalAmount + this._ask[i].Amount;
                average = average + (this._ask[i].Price * this._ask[i].Amount);
                i++;
            }
            else break;
        }
        console.log('TOTAL: ' + totalAmount)
        average = average / totalAmount;
        return average.toFixed(5);
    }
}

module.exports = PromedioPonderado;
