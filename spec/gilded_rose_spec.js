'use strict';

const Shop = require('../src/gilded_rose').Shop;

describe("Shop", function () {
  
  var item, updatedItem, shop;

  beforeEach(function () {
    item = { name: 'foo', quality: 5, sellIn: 5 };
    shop = new Shop([item]);
  })

  describe('updateQuality', function () {
    
    describe('given that the sell by date has not passed', function () {

      it('reduces the sellIn value by 1', function () {
        updatedItem = { name: 'foo', sellIn: 4, quality: 4};        
        expect(shop.updateQuality()).toContain(updatedItem);
      })

      it('reduces the quality of an item by 1', function () {
        updatedItem = { name: 'foo', sellIn: 4, quality: 4 };
        expect(shop.updateQuality()).toContain(updatedItem);
      })

      it('will not allow the quality to be negative', function () {
        item.quality = 0;
        updatedItem = { name: 'foo', sellIn: 4, quality: 0};
        expect(shop.updateQuality()).toContain(updatedItem);        
      })

      it('increases the quality of Brie', function () {
        item.name = 'Aged Brie';
        updatedItem = { name: 'Aged Brie', sellIn: 4, quality: 6 };        
        expect(shop.updateQuality()).toContain(updatedItem);
      })

      describe('Backstage passes', function () {

        beforeEach(() => {
          item.name = 'Backstage passes to a TAFKAL80ETC concert';
        })
        
        it('increases the quality of Backstage passes by 2 if sellIn < 10', function () {
          var name = item.name;
          item.sellIn = 7;
          updatedItem = { name: name, sellIn: 6, quality: 7 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

        it('increases the quality of Backstage passes by 3 if sellIn < 5', function () {
          var name = item.name;
          updatedItem = { name: name, sellIn:4, quality: 8 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })


    })

  })

});
