'use strict';

const Shop = require('../src/gilded_rose').Shop;

describe("Shop", () => {
  
  var item, updatedItem, shop, backStage, brie, sulfuras, conjured;
  
  brie      = 'Aged Brie';
  sulfuras  = 'Sulfuras, Hand of Ragnaros';
  backStage = 'Backstage passes to a TAFKAL80ETC concert';    
  conjured  = 'Conjured';

  beforeEach(() => {
    item = { name: 'foo', sellIn: 5, quality: 5 };
    shop = new Shop([item]);
  })

  it('initializes with an empty list of items', () => {
    expect(new Shop().items).toEqual([]);
  })

  describe('updateQuality', () => {

    describe('given that the sell by date has not passed', () => {

      it('reduces the sellIn value by 1', () => {
        updatedItem = { name: 'foo', sellIn: 4, quality: 4 };      
        expect(shop.updateQuality()).toContain(updatedItem);
      })
      it('reduces the quality of an item by 1', () => {
        updatedItem = { name: 'foo', sellIn: 4, quality: 4 };
        expect(shop.updateQuality()).toContain(updatedItem);
      })
      it('will not allow the quality to be negative', () => {
        item.quality = 0;
        updatedItem = { name: 'foo', sellIn: 4, quality: 0};
        expect(shop.updateQuality()).toContain(updatedItem);     
      })

      describe('Aged Brie', () => {

        beforeEach(() => { item.name = brie; })

        it('increases the quality of Brie', () => {
          updatedItem = { name: brie, sellIn: 4, quality: 6 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('will not allow the quality to be greater than 50', () => {
          item.quality = 49;            
          updatedItem = { name: brie, sellIn: 4, quality: 50 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('will not increase the quality if already > 50', () => {
          item.quality = 50;            
          updatedItem = { name: brie, sellIn: 4, quality: 50 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

      describe('Sulfuras', () => {
        
        it('never reduces the quality or sellIn value', () => {
          item.name = sulfuras;
          updatedItem = { name: sulfuras, sellIn: 5, quality: 5 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('never reduces the quality or sellIn value', () => {
          item.name = sulfuras;
          item.quality = 2;
          item.sellIn = -1;
          updatedItem = { name: sulfuras, sellIn: -1, quality: 2 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

      describe('Backstage passes', () => {

        beforeEach(() => { item.name = backStage; })     

        it('increases the quality of Backstage passes by 2 if sellIn < 10', () => {
          item.sellIn = 7;
          updatedItem = { name: backStage, sellIn: 6, quality: 7 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('increases the quality of Backstage passes by 3 if sellIn < 5', () => {
          updatedItem = { name: backStage, sellIn: 4, quality: 8 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('will not allow thw quality to be greater than 50', () => {
          item.quality = 49;
          updatedItem = { name: backStage, sellIn: 4, quality: 50 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('decrease quality if sellIn > 10', () => {
          item.sellIn = 12;
          item.quality = 5;
          updatedItem = { name: backStage, sellIn: 11, quality: 6 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

      describe('Conjured', () => {
        
        beforeEach(() => { item.name = conjured; })
        
        it('degrades twice as fast as normal items', () => {
          updatedItem = { name: conjured, sellIn: 4, quality: 3 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

    })

    describe('given that the sell by date has been reached', () => {
      
      beforeEach(() => { item.sellIn = 0; })

      it('reduces the quality of an item twice as fast', () => {
        updatedItem = { name: 'foo', sellIn: -1, quality: 3 };
        expect(shop.updateQuality()).toContain(updatedItem);
      })
      it('will not allow the quality to be negative', () => {
        item.sellIn = -1;
        item.quality = 0;
        updatedItem = { name: 'foo', sellIn: -2, quality: 0};
        expect(shop.updateQuality()).toContain(updatedItem);        
      })

      describe('Backstage passes', () => {

        beforeEach(() => { item.name = backStage; })     
        
        it('reduces the quality to 0', () => {
          item.sellIn = 0;
          updatedItem = { name: backStage, sellIn: -1, quality: 0 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

      describe('Aged Brie', () => {

        beforeEach(() => { item.name = brie; })    

        it('increases the quality twice as fast', () => {
          updatedItem = { name: brie, sellIn: -1, quality: 7 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })
        it('increases the quality twice as fast', () => {
          item.quality = 49
          updatedItem = { name: brie, sellIn: -1, quality: 50 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

    })

  })

});
