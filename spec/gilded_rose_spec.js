'use strict';

const Shop = require('../src/gilded_rose').Shop;

describe("Shop", () => {
  
  var item, updatedItem, shop, backStage, sulfuras, conjured;
  
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
    
    it('updates each item in the list', () => {
      item = jasmine.createSpyObj('default', ['updateQuality'])
      shop = new Shop([item]);    
      shop.updateQuality()
      expect(item.updateQuality).toHaveBeenCalled();
    })

    describe('given that the sell by date has not passed', () => {

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

      describe('Backstage passes', () => {

        beforeEach(() => { item.name = backStage; })     
        
        it('reduces the quality to 0', () => {
          item.sellIn = 0;
          updatedItem = { name: backStage, sellIn: -1, quality: 0 };        
          expect(shop.updateQuality()).toContain(updatedItem);
        })

      })

    })

  })

});
