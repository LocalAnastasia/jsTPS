'use strict'

import jsTPS_Transaction from '../src/jsTPS/jsTPS_Transaction'

class modifyListItem_Transaction extends jsTPS_Transaction{
    
    constructor(initList, newItem) {
        this.initList = initList;
        this.initItem = initList.getItem(newItem.key);
        this.newItem = newItem;
    }

    doTransaction() {
        this.initList.setItem(this.newItem.key, this.newItem);
    }

    undoTransaction() {
        this.initList.setItem(this.newItem.key, this.initItem);
    }

    toString() {
        return "Modify list item at index " + this.newItem.key + " to " + this.newItem.toString();
    }
}