'use strict';

const Shop = require('../src/gilded_rose').Shop;

describe("Shop", () => {
  
  var item, shop;
  
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

  })

});
