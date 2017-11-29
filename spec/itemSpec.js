'use strict';

const Item = require('../src/item').Item;

describe('Item', () => {

  var item;

  beforeEach(() => {    
    item = new Item('foo', 4, 6);
  })

  it('can be initialized with name', () => {
    expect(item.name).toEqual('foo')
  })
  it('can be initialized with a sellIn value', () => {
    expect(item.sellIn).toEqual(4)
  })
  it('can be initialized with a quality value', () => {
    expect(item.quality).toEqual(6)
  })
  
})
