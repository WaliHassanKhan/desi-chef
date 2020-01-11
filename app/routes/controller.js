var express = require('express');
var database = require('../utility/database');
var userDB = require('../utility/userDB');
const path = require('path');
var request = require('request');
var set1 = new Set(["100","101","102","200","201","202"]); //object currently in our inventory
var router = express.Router();
const { body } = require('express-validator/check');
var MongooseDB = require('../models/mongooseDB.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var password = require('password-hash-and-salt');
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//add static file to add the assets
router.use('/assets',express.static(path.join(__dirname, 'assets')));

router.get('/',function(req,res){
    res.render('index');
  });
router.get('/category',function(req,res,next){
  var data = {category:database.getCategory(),itemData:null};
  var categoryReply = function(reply){
    var data = {category:database.getCategory(),itemData:reply};
    res.render('category',{input:data});
  };
  database.getItems(categoryReply);
});

// if you are signed in it signs you out(if you are logged in) and takes you to the login page
router.get('/signOut',function(req,res){
  req.session.userProfile=null;
  res.render('login',{input:{error:""}})
});
//if you are already signed it it takes you to the myItems page otherwise it takes you to the login page
router.get('/signIn',function(req,res){
  if(req.session.userProfile==null){
    res.render('login',{input:{error:""}});
  }else{
    res.redirect('/myItems');
  }
});
router.post('/login',urlencodedParser,
    [check('emailAddress').isEmail(),
      check('password').isLength({min:8}),
    check('password').matches("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")],
    [sanitizeBody('emailAddress').trim().escape(),
    sanitizeBody('password').trim().escape()
    ],function(req,res){
      if(req.session.userProfile!=null){
        res.redirect('/myItems');
      }else{
        // check if incoming captcha results are valid
        if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
          return res.render('login',{input:{error:"Please complete the Captcha Challenge"}});
        }
        // secret key for the server side
        var secretKey = '6LfFIaEUAAAAAB87qu0ZSVDvDRL4GAOPoHwZmBhn';
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
        request(verificationUrl,function(error,response,body) {
                body = JSON.parse(body);
                // Success will be true or false depending upon captcha validation.
                if(body.success !== undefined && !body.success) {
                  return res.render('login',{input:{error:"Please complete the Captcha Challenge"}});
                }
                const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.render('login',{input:{error:errors.array()[0].msg+' for '+errors.array()[0].param}});
            }
            var callback = function(reply){
              if(reply==null){
                return res.render('login',{input:{error:"User Not Found"}});
              }
              else{
                  password(req.body.password).verifyAgainst(reply.User.password, function(error, verified) {
                    if(error)
                        throw new Error('Something went wrong!');
                    if(!verified) {
                        console.log("not verified");
                        res.render('login',{input:{error:"wrong username and password combination!"}})
                    } else {
                        req.session.userProfile = reply;
                        var callback2 = function(reply2){
                          for(var i=0;i<reply2.length;i++){
                            for(var j=0;j<req.session.userProfile.UserItem.length;j++){
                              if(reply2[i].itemCode==req.session.userProfile.UserItem[j].itemId){
                                req.session.userProfile.UserItem[j].item = reply2[i];
                                req.session.userProfile.UserItem[j].item.imageURL = "assets/images/"+req.session.userProfile.UserItem[j].item.itemCode+".jpg"
                              }
                            }
                          }
                          res.redirect('/myItems');
                          // res.render('myItems',{input:req.session.userProfile});
                        };
                        database.getItems(callback2);
                    }
                  });
              };
            }
            // this asynchronous function help us call another function so that it can be executed in the right order
            userDB.getUser((req.body.emailAddress).toLowerCase(),callback);
        });
        
      };
});
router.post('/signUp',urlencodedParser,
[check('emailAddress').isEmail(),
  check('password').isLength({min:8}),
check('password').matches("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"),
check('firstName').matches('[a-zA-Z]+'),
check('lastName').matches('[a-zA-Z]+'),
check('retype').isLength({min:8}),
check('retype').matches("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")],
[sanitizeBody('emailAddress').trim().escape(),
sanitizeBody('password').trim().escape(),
sanitizeBody('firstName').trim().escape(),
sanitizeBody('lastName').trim().escape(),
sanitizeBody('retype').trim().escape()
],function(req,res){
  if(req.session.userProfile!=null){
    res.redirect('/myItems');
  }else{
    //check captcha response and all other validation results
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
          return res.render('login',{input:{error:"Please complete the Captcha Challenge"}});
        }
        var secretKey = '6LfFIaEUAAAAAB87qu0ZSVDvDRL4GAOPoHwZmBhn';
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
        request(verificationUrl,function(error,response,body) {
            body = JSON.parse(body);
            // Success will be true or false depending upon captcha validation.
            if(body.success !== undefined && !body.success) {
              return res.render('login',{input:{error:"Please complete the Captcha Challenge"}});
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(422).json({ errors: errors.array() });
            }
            var callback = function(reply){
              if(reply==null){
                password(req.body.password).hash(function(err,hash){
                  if(err){
                    console.log("failed hash");
                  }
                  req.body.password = hash;
                  var callback2 = function(reply2){
                    if(reply2!=null){
                      req.session.userProfile = reply2;
                      res.redirect('/myItems');
                    }else{
                      res.render('login',{input:{error:"could not register the user"}});
                    }
                  };
                  userDB.createUser(req.body,callback2);
                });
              }
              else{
                res.render('login',{input:{error:"Username already exists"}});
              }
            };
            userDB.getUser((req.body.emailAddress).toLowerCase(),callback);
          });
    
  }

});
router.get('/updateitem/:id',function(req,res){
  //update id checks if this item is already in the our menu. If it is it updates that particular item accordingly
  if(set1.has(req.params.id) && req.params.id.length<5){
      var item = null;
      if(req.session.userProfile!=null){
      for (var i=0;i<req.session.userProfile.UserItem.length;i++){
        if(req.session.userProfile.UserItem[i].itemId==req.params.id){
          item = req.session.userProfile.UserItem[i];
          break;
        }
      };
      res.render('feedback2',{input:item});
    }else{
      res.redirect('/')
    }
  }else{
    res.redirect('/myItems')
  }
});
router.get('/deleteitem/:id',function(req,res){
  if(set1.has(req.params.id) && req.params.id.length<5){
    if(req.session.userProfile!=null){
        for (var i =0;i<req.session.userProfile.UserItem.length;i++){
          if(req.session.userProfile.UserItem[i].itemId==req.params.id){
            req.session.userProfile.UserItem.splice(i,1);
            userDB.sessionUpdate(req.session.userProfile);
            break;
          }
        };
        res.redirect('/myItems');
    }
    else{
      res.redirect('/');
    }
  }else{
    res.redirect('/myItems');
  }
});
router.get('/myItems',function(req,res){
  if(req.session.userProfile!=null){
    var callback = function(reply){
        if(reply==null){
          return res.render('login',{input:{error:"You have been logged out"}});
        }
        else{
          req.session.userProfile = reply;
          var callback2 = function(reply2){
            for(var i=0;i<reply2.length;i++){
              for(var j=0;j<req.session.userProfile.UserItem.length;j++){
                if(reply2[i].itemCode==req.session.userProfile.UserItem[j].itemId){
                  req.session.userProfile.UserItem[j].item = reply2[i];
                  req.session.userProfile.UserItem[j].item.imageURL = "assets/images/"+req.session.userProfile.UserItem[j].item.itemCode+".jpg"
                }
              }
            }
            res.render('myItems',{input:JSON.parse(JSON.stringify(req.session.userProfile))});
            // res.redirect('/myItems');
            // res.render('myItems',{input:req.session.userProfile});
          };
          database.getItems(callback2);            
      };
    };
            // this asynchronous function help us call another function so that it can be executed in the right order
    userDB.getUser(req.session.userProfile.emailAddress,callback);
    // res.render('myItems',{input:JSON.parse(JSON.stringify(req.session.userProfile))});
  }
  else{
    res.redirect('/signIn');
  }
});
router.get('/addItem/:id',function(req,res){
  if(req.session.userProfile!=null){
    var callback = function(item){
        var found = false;
        for (var i = 0;i<req.session.userProfile.UserItem.length;i++){
          if(req.session.userProfile.UserItem[i].itemId==req.params.id){
            found = true;
            break;
          }
        }
        if(!found){
          item.imageURL = "assets/images/"+item.itemCode+".jpg"
          req.session.userProfile.UserItem.push({ itemId: item.itemCode, rating: 3, madeIt: 'No', item: item });
          console.log("success");
        }
        userDB.sessionUpdate(req.session.userProfile);
        return res.redirect('/myItems');
      }
      database.getItem(req.params.id,callback);
  }
  else{
    return res.redirect('/signIn');
    // res.send("Please Login First by clicking my recipes");
  }
});
router.get('/about',function(req,res){
  var page = {name:"about.ejs"};
  res.render('about',{input:page});
});
router.get('/contact',function(req,res){
  var page = {name:"contact.ejs"};
  res.render('contact',{input:page});
});
router.get('/givefeedback',function(req,res){
  database.setRating(req.query.itemCode,req.query.rating);
  var item = {itemInfo:database.getItem(req.query.itemCode)};
  res.render('feedback',{input:item});
});
router.post('/givefeedback2/itemCode/:id',urlencodedParser,function(req,res){

  if(req.session.userProfile!=null){
    var item = null;
    console.log(req.body);
    console.log(req.params);
    for(var i=0;i<req.session.userProfile.UserItem.length;i++){
      if(req.session.userProfile.UserItem[i].itemId==req.params.id){
        req.session.userProfile.UserItem[i].rating = parseInt(req.body.rating);
        item = req.session.userProfile.UserItem[i];
        res.redirect('/myItems');
        userDB.sessionUpdate(req.session.userProfile)//,req.session.userProfile.UserItem[i].itemId,req.session.userProfile.UserItem[i].rating);
        break;
      }
    }
  }
  else{
    res.redirect('/');
  }
});
router.post('/givefeedback3/itemCode/:id',urlencodedParser,function(req,res){
    if(req.session.userProfile!=null){
      var item = null;
      for(var i=0;i<req.session.userProfile.UserItem.length;i++){
        if(req.session.userProfile.UserItem[i].itemId==req.params.id){
          if(req.body.madeIt=="yes"){
            req.session.userProfile.UserItem[i].madeIt = "Yes"
          }else{
            req.session.userProfile.UserItem[i].madeIt = "No"
          }
          userDB.sessionUpdate(req.session.userProfile);
          res.redirect('/myItems');
          break;
        }
      }
    }
    else{
      res.redirect('/');
    }
});
router.get('/:id',function(req,res,next){

  if(set1.has(req.params.id) && req.params.id.length<4){
    var temp = parseInt(req.params.id);
    var callback = function(reply){
      var item = {itemInfo:reply};
      item.itemInfo.imageURL = "assets/images/"+item.itemInfo.itemCode+".jpg"
      res.render('item',{input:item});
    }
    database.getItem(req.params.id,callback);
  }else{
    res.redirect('/category');
  }
});
router.get('/feedback/:id',function(req,res,next){
  if(set1.has(req.params.id) && req.params.id.length<5){
    var item = {itemInfo:database.getItem(req.params.id)};
    res.render('feedback',{input:item});
  }else{
    res.redirect(req.get('referer'));
  }
});
router.get('/*',function(req,res,next){
  console.log("");
});
module.exports = router
