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
        dayLimits: [11, 6],
        qualityDecrease: 0,
        qualityIncrease: 1,
        zeroQuality: 1,
        sellIn: 1
      }
    }
  }

  updateQuality() {

    for (var i = 0; i < this.items.length; i++) {

      var item = this.items[i];
      var itemCategory = item.name.split(' ')[0];

      var rule = this.itemRules[itemCategory] || this.itemRules.Default;

        for (var i = 0; i < rule.sellIn; i++) {
          this.updateSellIn(item);
        }

        console.log(itemCategory)
      if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
            for (var i = 0; i < rule.qualityDecrease; i++) {
              this.decrementQuality(item);
            }
      } else {
          this.incrementQuality(item)
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            rule.dayLimits.forEach(function (limit) {
              if (item.sellIn < limit) this.incrementQuality(item)  
            }, this)
          }
      }

      if (item.sellIn < 0) {
        if (item.name != 'Aged Brie') {
            for (var i = 0; i < rule.qualityDecrease; i++) {
              this.decrementQuality(item);
            }
            if (rule.zeroQuality) {
              for (var i = 0; i < rule.zeroQuality; i++) {
                this.zeroQuality(item);
              }
            }  
        } else {
          for (var i = 0; i < rule.qualityIncrease; i++) {
            this.incrementQuality(item);
          }
        }
      }

    }

    return this.items;
  }

  updateSellIn(item) {
    item.sellIn--;
  }

  incrementQuality(item) {
    if (item.quality < 50) item.quality++;   
  }

  decrementQuality(item) {
    if (item.quality > 0) item.quality--;
  }

  zeroQuality(item) {
    item.quality = 0;
  }

}

exports.Shop = Shop; 
