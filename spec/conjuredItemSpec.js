'use strict';

const ConjuredItem = require('../src/conjuredItem').ConjuredItem;

describe("ConjuredItem", () => {
  
  var item;
  
  describe('updateQuality', () => {

    it('reduces the sellIn value by 1', () => {
      item = new ConjuredItem('Backstage Pass', 5, 5);
      item.updateQuality();
      expect(item.sellIn).toEqual(4);
    })
    
    describe('given that the sell by date has not passed', () => {

      it('degrades twice as fast as normal items', () => {
        item = new ConjuredItem('Backstage Pass', 5, 5);
        item.updateQuality();
        expect(item.quality).toEqual(3);
      })

    })

    describe('given that the sell by date has passed', () => {
      
      it('degrades twice as fast as normal items', () => {
        item = new ConjuredItem('Backstage Pass', 0, 5);
        item.updateQuality();
        expect(item.quality).toEqual(1);
      })

    })

  })

})
