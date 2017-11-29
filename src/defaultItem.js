'use strict';

const Item = require('../src/item').Item;

class DefaultItem extends Item {

  updateQuality() {
    this._updateSellIn();
    this._decrementQuality();
    if (this.sellIn < 0) this._decrementQuality();    
  }

  _updateSellIn() {
    this.sellIn--;
  }

  _incrementQuality(count = 1) {
    if (this.quality < 50) this.quality += count;
  }

  _decrementQuality(count = 1) {
    if (this.quality > 0) this.quality -= count;
  }

  _zeroQuality() {
    this.quality = 0;
  }

}

exports.DefaultItem = DefaultItem
