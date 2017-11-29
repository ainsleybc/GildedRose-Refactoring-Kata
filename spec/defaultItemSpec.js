'use strict';

const DefaultItem = require('../src/defaultItem').DefaultItem;

describe("DefaultItem", () => {
  
  var item;
  
  
  describe('updateQuality', () => {
    
    describe('given that the sell by date has not passed', () => {
      
      beforeEach(() => {
        item = new DefaultItem('foo', 5, 5);
      })

      it('reduces the sellIn value by 1', () => {
        item.updateQuality();
        expect(item.sellIn).toEqual(4);
      })
      it('reduces the quality of an item by 1', () => {
        item.updateQuality();
        expect(item.quality).toEqual(4);
      })
      it('will not allow the quality to be negative', () => {
        item = new DefaultItem('foo', 5, 0);
        expect(item.quality).toEqual(0);
      })

    })

    describe('given that the sell by date has been reached', () => {

      it('reduces the quality of an item twice as fast', () => {
        item = new DefaultItem('foo', 0, 5);
        item.updateQuality();
        expect(item.quality).toEqual(3);
      })
      it('will not allow the quality to be negative', () => {
        item = new DefaultItem('foo', -1, 0);        
        item.updateQuality();
        expect(item.quality).toEqual(0);
      })

    })

  })

})
