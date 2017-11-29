'use strict';

const BackstageItem = require('../src/backstageItem').BackstageItem;

describe("BackstageItem", () => {
  
  var item;
  
  describe('updateQuality', () => {

    it('reduces the sellIn value by 1', () => {
      item = new BackstageItem('Backstage Pass', 5, 5);
      item.updateQuality();
      expect(item.sellIn).toEqual(4);
    })
    
    describe('given that the sell by date has not passed', () => {

      it('increases the quality of Backstage passes by 2 if sellIn < 10', () => {
        item = new BackstageItem('Backstage Pass', 7, 5);
        item.updateQuality();
        expect(item.quality).toEqual(7);        
      })
      it('increases the quality of Backstage passes by 3 if sellIn < 5', () => {
        item = new BackstageItem('Backstage Pass', 4, 5);
        item.updateQuality();
        expect(item.quality).toEqual(8); 
      })
      it('will not allow thw quality to be greater than 50', () => {
        item = new BackstageItem('Backstage Pass', 5, 49);
        item.updateQuality();
        expect(item.quality).toEqual(50);
      })
      it('decrease quality if sellIn > 10', () => {
        item = new BackstageItem('Backstage Pass', 12, 5);
        item.updateQuality();
        expect(item.quality).toEqual(6);
      })

    })

    describe('given that the sell by date has been reached', () => {
      
      it('reduces the quality to 0', () => {
        item = new BackstageItem('Backstage Pass', -1, 0);
        item.updateQuality();
        expect(item.quality).toEqual(0);
      })

    })

  })

})
