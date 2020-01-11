class User{

  constructor(firstName,lastName,emailAddress,userId){
    this._firstName = firstName;
    this._lastName = lastName;
    this._emailAddress = emailAddress;
    this._userId = userId;
  }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set itemName(value) {
        this._lastName = value;
    }

    get emailAddress() {
        return this._emailAddress;
    }

    set emailAddress(value) {
        this._emailAddress = value;
    }
    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

}



module.exports = User;
