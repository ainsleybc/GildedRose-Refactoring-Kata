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
        dayLimits: [11, 6],
        zeroQuality: true
      }
    }
  }

  updateQuality() {

    for (var i = 0; i < this.items.length; i++) {

      var item = this.items[i];
      var itemCategory = item.name.split(/\s*\b\s*/)[0];
      var rule = this.itemRules[itemCategory] || this.itemRules.Default;

      this._updateSellIn(item, rule);
      this._executeRules(item, rule);
      if (rule.dayLimits) {
        rule.dayLimits.forEach((limit) => {
          if (item.sellIn < limit) this._incrementQuality(item, 1)  
        }, this)
      }

      if (item.sellIn < 0) {
        this._executeRules(item, rule);      
        if (rule.zeroQuality) this._zeroQuality(item);  
      }

    }

    return this.items;
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
