'use strict';

const Item = require('../src/item').Item;

describe('Item', function () {

  var item;

  beforeEach(function () {    
    item = new Item('foo', 4, 6);
  })

  it('can be initialized with name', function () {
    expect(item.name).toEqual('foo')
  })
  it('can be initialized with a sellIn value', function () {
    expect(item.sellIn).toEqual(4)
  })
  it('can be initialized with a quality value', function () {
    expect(item.quality).toEqual(6)
  })
  
})
