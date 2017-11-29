'use strict';

const SulfurasItem = require('../src/sulfurasItem').SulfurasItem;

describe("SulfurasItem", () => {
  
  var item;
  
  describe('updateQuality', () => {

    it('does not reduce the sellIn value', () => {
      item = new SulfurasItem('Backstage Pass', 5, 5);
      item.updateQuality();
      expect(item.sellIn).toEqual(5);
    })
    
    describe('given that the sell by date has not passed', () => {

      it('never reduces the quality or sellIn value', () => {
        item = new SulfurasItem('Backstage Pass', 5, 5);
        item.updateQuality();
        expect(item.quality).toEqual(5);
      })

    })

    describe('given that the sell by date has passed', () => {
      
      it('never reduces the quality or sellIn value', () => {
        item = new SulfurasItem('Backstage Pass', -1, 2);
        item.updateQuality();
        expect(item.quality).toEqual(2);
      })

    })

  })

})
