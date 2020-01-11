var mongoose = require('mongoose');
var foodSchema = new mongoose.Schema({
  itemCode: {
    type:String
  },
  itemName: {
    type:String
  },
  catalogCategory: {
    type:String
  },
  description: {
    type:String
  },
  rating: {
    type:String
  },
  imageURL: {
    type:String
  }
});
var personalItemSchema = new mongoose.Schema({
  itemId:{type:String,required:true},
  rating:{type:Number,required:true},
  madeIt:{type:String,required:true},
  item:foodSchema,
});
var userSchema = new mongoose.Schema({
    emailAddress:{type:String,required:true},
    User:{
      firstName:{type:String,required:true},
      lastName:{type:String,required:true},
      password:{type:String,required:true}
    },
    UserItem:[personalItemSchema]
});

var Food  = mongoose.model('eFood',foodSchema);
var User = mongoose.model('eUser',userSchema);
module.exports.Food = Food;
module.exports.foodSchema = foodSchema;
module.exports.User = User;
module.exports.userSchema = userSchema;
// module.exports.
