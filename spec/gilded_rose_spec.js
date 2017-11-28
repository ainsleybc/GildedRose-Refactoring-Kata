'use strict';

const Shop = require('../src/gilded_rose').Shop;

describe("Shop", function () {
  
  var item, updatedItem, shop, name;
  
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

      describe('Aged Brie', function () {

        beforeEach(function () {
          item.name = 'Aged Brie';
          item.quality = 49;  
        })

        it('increases the quality of Brie', function () {
          updatedItem = { name: 'Aged Brie', sellIn: 4, quality: 50 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('will not allow thw quality to be greater than 50', function () {
          updatedItem = { name: 'Aged Brie', sellIn: 4, quality: 50 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

      describe('Sulfuras', function () {
        
        it('never reduces the quality or sellIn value', function () {
          item.name = 'Sulfuras, Hand of Ragnaros';
          updatedItem = { name: 'Sulfuras, Hand of Ragnaros', sellIn: 5, quality: 5 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

      describe('Backstage passes', function () {

        beforeEach(() => {
          name = 'Backstage passes to a TAFKAL80ETC concert';
          item.name = name;
        })     

        it('increases the quality of Backstage passes by 2 if sellIn < 10', function () {
          item.sellIn = 7;
          updatedItem = { name: name, sellIn: 6, quality: 7 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('increases the quality of Backstage passes by 3 if sellIn < 5', function () {
          updatedItem = { name: name, sellIn:4, quality: 8 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('will not allow thw quality to be greater than 50', function () {
          item.quality = 50;
          updatedItem = { name: name, sellIn: 4, quality: 50 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

    })

    describe('given that the sell by date has been reached', function () {
      
      beforeEach(() => { item.sellIn = 0; })

      it('reduces the quality of an item twice as fast', function () {
        updatedItem = { name: 'foo', sellIn: -1, quality: 3 };
        expect(shop.updateQuality()).toContain(updatedItem);
      })

      describe('Backstage passes', function () {

        beforeEach(() => {
          name = 'Backstage passes to a TAFKAL80ETC concert';
          item.name = name;
        })     
        
        it('reduces the quality to 0', function () {
          item.sellIn = 0;
          updatedItem = { name: name, sellIn: -1, quality: 0 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })
    })

  })

});
