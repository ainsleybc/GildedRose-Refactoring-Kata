'use strict';

const Item = require('../src/item').Item;

class DefaultItem extends Item {

  updateQuality() {
    this._updateSellIn();
    this._decrementQuality();
    if (this.sellIn < 0) this._decrementQuality();    
  }

  _updateSellIn(item) {
    this.sellIn--;
  }

  _incrementQuality(times = 0) {
    if (this.quality < 50) this.quality++;
  }

  _decrementQuality(times = 0) {
    if (this.quality > 0) this.quality--;
  }

  _zeroQuality(item) {
    this.quality = 0;
  }

}

exports.DefaultItem = DefaultItem
