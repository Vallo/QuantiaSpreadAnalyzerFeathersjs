const assert = require('assert');
const {getAllPrices} = require('../src/domain/Analyzer');


describe('Analyzes ', async () => {  
    it('Analyzes btc', async () => {
        for (i = 0; i < 50; i++) { 
            await getAllPrices('btc')
          }
    });
});