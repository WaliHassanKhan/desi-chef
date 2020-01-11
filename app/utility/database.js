
var Dish = require('../models/dish');
var User = require('../models/user');
var UserItem = require('../models/userItem');
var UserProfile = require('../models/userProfile');
var MongooseDB = require('../models/mongooseDB.js');
// var MainDB = require('../hw4_create_db.js');
var mongoose = require('mongoose');
const ret = mongoose.connect('mongodb+srv://walikhan:Moodle.1@nbad-679cs.gcp.mongodb.net/test?retryWrites=true',
{useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var Model = new mongoose.model('efoods',MongooseDB.foodSchema);
  module.exports.getItems = function (callback) {
      Model.find().then(function(docs){
        callback(docs);
      });
  };
  module.exports.getItem = function (itemCode,callback) {
      Model.findOne({itemCode:itemCode}).then(function(docs){
        callback(docs);
      });
  };
  // module.exports.setRating = function(itemCode,rating){
  //   MongooseDB.Food.UpdateOne({itemCode:itemCode},{$set:{
  //     rating:rating
  //   }
  // });
  // };
  module.exports.parseitem= function(inputUser){
    return { _itemId: inputUser._itemCode, _rating: inputUser._rating, _madeIt: 'No', _item: inputUser };
  };
});


module.exports.getCategory = function(){
  return category;
};


var category = ["Appetizer","Main Course"];
