'use strict';

class Shop {

  constructor(items=[]){
    this.items = items;
    this.itemRules = {
      Default: {
        qualityDecrease: 1,
      },
      Sulfuras: {
        dontUpdateSellIn: true
      },
      Aged: {
        qualityIncrease: 1,
      },
      Backstage: {
        qualityIncrease: 1,
        dayBoundaries: [11, 6],
        zeroQuality: true
      },
      Conjured: {
        qualityDecrease: 2,
      },
    }
  }

  updateQuality() {

    for (var i = 0; i < this.items.length; i++) {
      var item        = this.items[i],
        itemCategory  = item.name.split(/\s*\b\s*/)[0],
        rule          = this.itemRules[itemCategory] || this.itemRules.Default;

      this._updateSellIn(item, rule);
      this._executeRules(item, rule);
      this._executeDayBoundaryRules(item, rule);
      this._executeExpirationRules(item, rule);
    }

    return this.items;
  }

  _executeExpirationRules(item, rule) {
    if (item.sellIn < 0) {
      this._executeRules(item, rule);      
      if (rule.zeroQuality) this._zeroQuality(item);  
    }
  }

  _executeDayBoundaryRules(item, rule) {
    if (rule.dayBoundaries) {
      rule.dayBoundaries.forEach((limit) => {
        if (item.sellIn < limit) this._executeRules(item, rule); 
      }, this)
    }
  }

  _updateSellIn(item, rule) {
    if (!rule.dontUpdateSellIn) item.sellIn--;
  }

  _executeRules(item, rule) {
    this._decrementQuality(item, rule.qualityDecrease);
    this._incrementQuality(item, rule.qualityIncrease)
  } 

  _incrementQuality(item, times = 0) {
    for (var i = 0; i < times; i++) {
      if (item.quality < 50) item.quality++;
    }
  }

  _decrementQuality(item, times = 0) {
    for (var i = 0; i < times; i++) {  
      if (item.quality > 0) item.quality--;
    }  
  }

  _zeroQuality(item) {
    item.quality = 0;
  }

}

exports.Shop = Shop; 
