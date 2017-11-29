'use strict';

const Shop = require('../src/gilded_rose').Shop;

describe("Shop", function () {
  
  var item, updatedItem, shop, backStage, brie, sulfuras, conjured;
  
  beforeEach(function () {
    item = { name: 'foo', sellIn: 5, quality: 5 };
    backStage = 'Backstage passes to a TAFKAL80ETC concert';    
    brie = 'Aged Brie';
    sulfuras = 'Sulfuras, Hand of Ragnaros';
    conjured = 'Conjured';
    shop = new Shop([item]);
  })

  it('initializes with an empty list of items', function () {
    expect(new Shop().items).toEqual([]);
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

        beforeEach(function () { item.name = brie; })

        it('increases the quality of Brie', function () {
          updatedItem = { name: brie, sellIn: 4, quality: 6 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('will not allow the quality to be greater than 50', function () {
          item.quality = 49;            
          updatedItem = { name: brie, sellIn: 4, quality: 50 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('will not increase the quality if already > 50', function () {
          item.quality = 50;            
          updatedItem = { name: brie, sellIn: 4, quality: 50 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

      describe('Sulfuras', function () {
        
        it('never reduces the quality or sellIn value', function () {
          item.name = sulfuras;
          updatedItem = { name: sulfuras, sellIn: 5, quality: 5 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('never reduces the quality or sellIn value', function () {
          item.name = sulfuras;
          item.quality = 2;
          item.sellIn = -1;
          updatedItem = { name: sulfuras, sellIn: -1, quality: 2 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

      describe('Backstage passes', function () {

        beforeEach(() => { item.name = backStage; })     

        it('increases the quality of Backstage passes by 2 if sellIn < 10', function () {
          item.sellIn = 7;
          updatedItem = { name: backStage, sellIn: 6, quality: 7 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('increases the quality of Backstage passes by 3 if sellIn < 5', function () {
          updatedItem = { name: backStage, sellIn: 4, quality: 8 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('will not allow thw quality to be greater than 50', function () {
          item.quality = 49;
          updatedItem = { name: backStage, sellIn: 4, quality: 50 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('decrease quality if sellIn > 10', function () {
          item.sellIn = 12;
          item.quality = 5;
          updatedItem = { name: backStage, sellIn: 11, quality: 6 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

      describe('Conjured', function () {
        
        beforeEach(() => { item.name = conjured; })
        
        it('degrades twice as fast as normal items', function () {
          updatedItem = { name: conjured, sellIn: 4, quality: 3 };        
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
      it('will not allow the quality to be negative', function () {
        item.sellIn = -1;
        item.quality = 0;
        updatedItem = { name: 'foo', sellIn: -2, quality: 0};
        expect(shop.updateQuality()).toContain(updatedItem);        
      })

      describe('Backstage passes', function () {

        beforeEach(() => { item.name = backStage; })     
        
        it('reduces the quality to 0', function () {
          item.sellIn = 0;
          updatedItem = { name: backStage, sellIn: -1, quality: 0 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

      describe('Aged Brie', function () {

        beforeEach(() => { item.name = brie; })    

        it('increases the quality twice as fast', function () {
          updatedItem = { name: brie, sellIn: -1, quality: 7 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('increases the quality twice as fast', function () {
          item.quality = 49
          updatedItem = { name: brie, sellIn: -1, quality: 50 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

    })

  })

});
