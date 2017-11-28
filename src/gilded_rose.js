'use strict';

class Shop {
  constructor(items=[]){
    this.items = items;
    this.itemRules = {
      Default: {
        qualityDecrease: 1,
        qualityIncrease: 0,
      }
    }
  }
  updateQuality() {

    for (var i = 0; i < this.items.length; i++) {

      var item = this.items[i];

      var rule = this.itemRules[item.name] || this.itemRules.Default;

      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        this.updateSellIn(item);
      }

      if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            for (var i = 0; i < rule.qualityDecrease; i++) {
              this.decrementQuality(item);
            }
          }
      } else {
          this.incrementQuality(item)
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
                this.incrementQuality(item)
            }
            if (item.sellIn < 6) {
                this.incrementQuality(item)
            }
          }
      }

      if (item.sellIn < 0) {
        if (item.name != 'Aged Brie') {
          if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
              if (item.name != 'Sulfuras, Hand of Ragnaros') {
                this.decrementQuality(item);
              }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          this.updateBrie(item);
        }
      }

    }

    return this.items;
  }

  updateBrie(item) {
      this.incrementQuality(item);
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

}

exports.Shop = Shop; 
