'use strict';

const Shop = require('../src/gilded_rose').Shop;
const Item = require('../src/item').Item;

describe("Gilded Rose", function () {
  
  var item, shop, items;

  beforeEach(function () {
    item = {name: 'foo'};
    shop = new Shop([item]);
  })

  it("should foo", function () {
    const gildedRose = new Shop([item]);
    items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  describe('updateQuality', function () {
    
    describe('sellIn is greater than 0', function () {

      beforeEach(function () {
        item.sellIn = 5;
      })

      it('should reduce the quality of an item by 1', function () {
        item.quality = 5;
        shop.updateQuality()
        expect(item.quality).toEqual(4);
      })

    })

  })

});
