'use strict';

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {

    for (var i = 0; i < this.items.length; i++) {

      var item = this.items[i];
      
      if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            this.decrementQuality(item);
          }
        }
      } else {
        if (item.quality < 50) {
          this.incrementQuality(item)
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                this.incrementQuality(item)
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                this.incrementQuality(item)
              }
            }
          }
        }
      }
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != 'Aged Brie') {
          if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0) {
              if (item.name != 'Sulfuras, Hand of Ragnaros') {
                this.decrementQuality(item);
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            this.incrementQuality(item);
          }
        }
      }
    }

    return this.items;
  }

  incrementQuality(item) {
    item.quality++;   
  }

  decrementQuality(item) {
    item.quality--;
  }

}

exports.Shop = Shop; 
