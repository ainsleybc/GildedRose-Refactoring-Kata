'use strict';

class Shop {

  constructor(items=[]){
    this.items = items;
    this.itemRules = {
      Default: {
        qualityDecrease: 1,
      },
      "Sulfuras,": {
        sellIn: false
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
      var itemCategory = item.name.split(' ')[0];
      var rule = this.itemRules[itemCategory] || this.itemRules.Default;

      this.updateSellIn(item, rule.sellIn);
      this.executeRules(item, rule);
      if (rule.dayLimits) {
        rule.dayLimits.forEach((limit) => {
          if (item.sellIn < limit) this.incrementQuality(item, 1)  
        }, this)
      }

      if (item.sellIn < 0) {
        this.executeRules(item, rule);      
        if (rule.zeroQuality) this.zeroQuality(item);  
      }

    }

    return this.items;
  }

  updateSellIn(item, update = true) {
    if (update) item.sellIn--;
  }

  executeRules(item, rule) {
    this.decrementQuality(item, rule.qualityDecrease);
    this.incrementQuality(item, rule.qualityIncrease)
  } 

  incrementQuality(item, times = 0) {
    for (var i = 0; i < times; i++) {
      if (item.quality < 50) item.quality++;
    }
  }

  decrementQuality(item, times = 0) {
    for (var i = 0; i < times; i++) {  
      if (item.quality > 0) item.quality--;
    }  
  }

  zeroQuality(item) {
    item.quality = 0;
  }

}

exports.Shop = Shop; 
