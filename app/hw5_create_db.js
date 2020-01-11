var mongoose = require('mongoose');
var MongooseDB = require('./models/mongooseDB');
const ret = mongoose.connect('mongodb+srv://walikhan:Moodle.1@nbad-679cs.gcp.mongodb.net/test?retryWrites=true',
{useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  MongooseDB.Food.remove({},function(){
    MongooseDB.Food.collection.insert(data,function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Insertion Successful");
      }
    });
  });
  MongooseDB.User.remove({},function(err){
    MongooseDB.User.collection.insert(userProfileList,function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Insertion Successful");
      }
    });
  });
});


var data = [
    {
        itemCode: "100",
        itemName: "Nachos",
        catalogCategory: "Appetizer",
        description: "Nachos is always a good way to start your meal",
        rating: 4,
        imageURL: ""
    },
    {
        itemCode: "101",
        itemName: "Kebab",
        catalogCategory: "Appetizer",
        description: "Try This!!",
        rating: 5,
        imageURL: ""
    },
    {
        itemCode: "102",
        itemName: "Chilli Chicken",
        catalogCategory: "Appetizer",
        description: "Chef's recommended starter",
        rating: 3,
        imageURL: ""
    },
    {
        itemCode: "200",
        itemName: "Karahi",
        catalogCategory: "Main Course",
        description: "A good way to end your meal",
        rating: 5,
        imageURL: ""
    },
    {
        itemCode: "201",
        itemName: "Spaghetti",
        catalogCategory: "Main Course",
        description: "It's really really good",
        rating: 5,
        imageURL: "assets/images/spaghetti.jpg"
    },
    {
        itemCode: "202",
        itemName: "Biryani",
        catalogCategory: "Main Course",
        description: "Buy It!!",
        rating: 3,
        imageURL: ""
    },
];


var userProfileList = [
  {
    emailAddress:"alpha@delta.com",
    User:{
      firstName:"Alpha",
      lastName:"Beta",
      password:"pbkdf2$10000$6fd69f23d7f1f1b83eab237043f57921e70d8a098548aaf3fc570bed9c66ec3d8fb90ccec6ac362918fa75cdb46976c1c5336c52556f50e0c3f0485f226ed08a$6767830de14bcdb127ebfa2f895a6fa59bd7fb0439264075bf5c3c46f7f8778df5c1992ab11b84da021786d8b92db8ce51ed437274d1d592f49f6ed781c52ebc"
    },
    UserItem:[
      {itemId:"100",
      rating:3,
      madeIt:"No",
      item:null,
    },
    {itemId:"101",
      rating:2,
      madeIt:"Yes",
      item:null,
    },
    ]
  },
  {
    emailAddress:"alpha2@beta.com",
    User:{
      firstName:"Alpha2",
      lastName:"Beta2",
      password:"pbkdf2$10000$f30a3986b4675bb6028fa67870abca12b05ed3ddee5dc211aa80f11557df7e25547ddf0c15038d41c9165791a8875606524329aa10f514e6ebfff2d4656d8b66$197c0522ca4bf1c7ab47b8e4c25dde6c02ad9b57208cfe2987c6651625f5f63a3c839431c48a31e668dfa9d2cbebf1f686f258a486b6b80c10c8540e2a968974"
    },
    UserItem:[
      {itemId:"200",
      rating:3,
      madeIt:"No",
      item:null,
    },
    {itemId:"101",
      rating:4,
      madeIt:"Yes",
      item:null,
    },
    ]
  }
];
