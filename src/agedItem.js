'use strict';

const DefaultItem = require('../src/defaultItem').DefaultItem;

class AgedItem extends DefaultItem {

  updateQuality() {
    this._updateSellIn();
    this._incrementQuality();
    if (this.sellIn < 0) this._incrementQuality();    
  }

}

exports.AgedItem = AgedItem
