'use strict';

const DefaultItem = require('../src/defaultItem').DefaultItem;

class ConjuredItem extends DefaultItem {
  
  updateQuality() {
    this._updateSellIn();
    this._decrementQuality(2);
    if (this.sellIn < 0) this._decrementQuality(2)
  }

}

exports.ConjuredItem = ConjuredItem
