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
