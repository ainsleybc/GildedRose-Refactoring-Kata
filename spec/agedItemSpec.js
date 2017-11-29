'use strict';

const AgedItem = require('../src/agedItem').AgedItem;

describe("AgedItem", () => {
  
  var item;
  
  describe('updateQuality', () => {

    it('reduces the sellIn value by 1', () => {
      item = new AgedItem('Aged Brie', 5, 5);              
      item.updateQuality();
      expect(item.sellIn).toEqual(4);
    })
    
    describe('given that the sell by date has not passed', () => {
        
      it('increases the quality of Brie', () => {
        item = new AgedItem('Aged Brie', 5, 5);        
        item.updateQuality();
        expect(item.quality).toEqual(6);
      })
      it('will not allow the quality to be greater than 50', () => {
        item = new AgedItem('Aged Brie', 5, 50); 
        item.updateQuality();        
        expect(item.quality).toEqual(50);
      })
      it('will not increase the quality if already > 50', () => {
        item = new AgedItem('Aged Brie', 5, 51);         
        expect(item.quality).toEqual(51);        
      })

    })

    describe('given that the sell by date has passed', () => {
      
      it('increases the quality twice as fast', () => {
        item = new AgedItem('Aged Brie', 0, 5);   
        item.updateQuality();
        expect(item.quality).toEqual(7);
      })

    })  

  })

})
