class UserItem{

  constructor(itemId,rating,madeIt,item){
    this._itemId = itemId;
    this._rating = rating;
    this._madeIt = madeIt;
    this._item = item;
  }
    get itemId() {
        return this._itemId;
    }
    set itemId(value) {
        this._itemId = value;
    }
    get item() {
        return this._item;
    }
    set item(value) {
        this._item = value;
    }
    get rating() {
        return this._rating;
    }
    set rating(value) {
        this._rating = value;
    }
    get madeIt() {
        return this._madeIt;
    }
    set madeIt(value) {
        this._madeIt = value;
    }
}



module.exports = UserItem;
