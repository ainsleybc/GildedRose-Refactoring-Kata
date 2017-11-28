'use strict';

const Shop = require('../src/gilded_rose').Shop;

describe("Shop", function () {
  
  var item, shop, items;

  beforeEach(function () {
    item = { name: 'foo' };
    shop = new Shop([item]);
  })

  describe('updateQuality', function () {
    
    describe('given that the sell by date has not passed', function () {

      beforeEach(function () {
        item.sellIn = 5;
      })

      it('should reduce the quality of an item by 1', function () {
        item.quality = 5;
        var updatedItem = { name: 'foo', sellIn: 4, quality: 4 };
        expect(shop.updateQuality()).toContain(updatedItem);
      })

    })

  })

});
