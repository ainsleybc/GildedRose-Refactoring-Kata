'use strict';

const DefaultItem = require('../src/defaultItem').DefaultItem;

class BackstageItem extends DefaultItem {
 
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
    this.incrementRanges = [0, 6, 11];
  }
  
  updateQuality() {
    this._updateSellIn();
    this._incrementQuality();
    this.incrementRanges.forEach((range)=> {
      if (this.sellIn < range) this._incrementQuality();
    })
    if (this.sellIn < 0) this._zeroQuality();
  }

}

exports.BackstageItem = BackstageItem
