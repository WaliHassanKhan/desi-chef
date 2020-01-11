class UserProfile{

  constructor(userId,userItems,user){
    this._userId = userId;
    this._userItems = userItems;
    this._user = user;
  }
  addUser (input){
    for(var i= 0;i<this._userItems.length;i++){
      if(_userItems.item == input.item){
        return;
      }
    }
    this._userItems.push(userItems);
  };
  removeItem(input){
    for(var i= 0;i<this._userItems.length;i++){
      if(_userItems.item == input.item){
        self._userItems.splice(i,1);
        return;
      }
    }
  };
  updateItem(input){
    for(var i= 0;i<this._userItems.length;i++){
      if(_userItems.item == input.item){
        self._userItems[i]= input;
        return;
      }
    }
  };
  emptyProfile(input){
    this.user_id = 0;
    this.userItems = [];
    this.user = null;
  };
  get userId() {
      return this._userId;
  };
  set userId(value) {
      this._userId = value;
  };
  get userItems() {
      return this._userItems;
  };
  set userItems(value) {
      this._userItems = value;
  };
  get user() {
      return this._user;
  };
  set user(value) {
      this._user = value;
  };
}



module.exports = UserProfile;




// { _userId: '10000',
//   _userItems:
//    [ { _itemId: '100', _rating: 3, _madeIt: 'No', _item: [Object] },
//      { _itemId: '101', _rating: 2, _madeIt: 'Yes', _item: [Object] } ],
//   _user:
//    { _firstName: 'Alpha',
//      _lastName: 'Beta',
//      _emailAddress: 'Alpha@beta.com',
//      _userId: '10000' } }
