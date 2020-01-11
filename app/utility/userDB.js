var Dish = require('../models/dish');
var User = require('../models/user');
var UserItem = require('../models/userItem');
var UserProfile = require('../models/userProfile');
var MongooseDB = require('../models/mongooseDB.js');
var database = require('./database');
var mongoose = require('mongoose');
const ret = mongoose.connect('mongodb+srv://walikhan:Moodle.1@nbad-679cs.gcp.mongodb.net/test?retryWrites=true',
{useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var Model = new mongoose.model('eusers',MongooseDB.userSchema);
  module.exports.getUser= function(inputUserEmail,callback){

    Model.findOne({emailAddress:inputUserEmail}).then(function(docs,err){
      docs = JSON.parse(JSON.stringify(docs));
      if(err){
        callback(null);
        return;
      }else{
        callback(docs);
        return;
      }
    });
  };
  module.exports.createUser = function(input,callback){
    var tempUser = {
      emailAddress:"",
      User:{
        firstName:"",
        lastName:"",
        password:""
      },
      UserItem:[]
    };
    tempUser.emailAddress = input.emailAddress;
    tempUser.User.firstName = input.firstName;
    tempUser.User.lastName = input.lastName;
    tempUser.User.password = input.password;
    tempUser.UserItem = []
    Model.create(tempUser,function(err,docs){
      callback(docs);
    });
    // Mode.save(function(err,reply){
    //   callback(reply);
    // });
}
  module.exports.sessionUpdate = function(profile){
    Model.updateOne({_id:profile._id},{$set:{User:profile.User,UserItem:profile.UserItem}}).then(function(docs){
    }).catch(function (err) {
      console.log(err);
    });
  };
});
