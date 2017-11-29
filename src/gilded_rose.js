'use strict';

class Shop {

  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {

    for (var i = 0; i < this.items.length; i++) {
      this.items[i].updateQuality();
    }

    return this.items;
  }

}

exports.Shop = Shop; 
