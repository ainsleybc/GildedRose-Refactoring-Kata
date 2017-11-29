'use strict';

class Shop {

  constructor(items=[]){
    this.items = items;
    this.itemRules = {
      Default: {
        qualityDecrease: 1,
        qualityIncrease: 0,
        sellIn: 1
      },
      "Sulfuras,": {
        qualityDecrease: 0,
        qualityIncrease: 0,
        sellIn: 0
      },
      Aged: {
        qualityDecrease: 0,
        qualityIncrease: 1,
        sellIn: 1
      },
      Backstage: {
        qualityDecrease: 0,
        qualityIncrease: 1,
        sellIn: 1,
        dayLimits: [11, 6],
        zeroQuality: 1
      }
    }
  }

  updateQuality() {

    for (var i = 0; i < this.items.length; i++) {

      var item = this.items[i];
      var itemCategory = item.name.split(' ')[0];

      var rule = this.itemRules[itemCategory] || this.itemRules.Default;

        this.updateSellIn(item, rule.sellIn);
        this.decrementQuality(item, rule.qualityDecrease);
        this.incrementQuality(item, rule.qualityIncrease)
        if (rule.dayLimits) {
          rule.dayLimits.forEach(function (limit) {
            if (item.sellIn < limit) this.incrementQuality(item, 1)  
          }, this)
        }

      if (item.sellIn < 0) {
        if (item.name != 'Aged Brie') {
              this.decrementQuality(item, rule.qualityDecrease);
            if (rule.zeroQuality) {
                this.zeroQuality(item);
            }  
        } else {
          this.incrementQuality(item, rule.qualityIncrease);
        }
      }

    }

    return this.items;
  }

  updateSellIn(item, times) {
    for (var i = 0; i < times; i++) {
      item.sellIn--;
    }
  }

  incrementQuality(item, times) {
    for (var i = 0; i < times; i++) {
      if (item.quality < 50) item.quality++;
    }
  }

  decrementQuality(item, times) {
    for (var i = 0; i < times; i++) {  
      if (item.quality > 0) item.quality--;
    }  
  }

  zeroQuality(item) {
    item.quality = 0;
  }

}

exports.Shop = Shop; 
