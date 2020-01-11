express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

//creating session key
app.use(session({  
  secret: 'customer'
}));
const path = require('path');
app.set('view engine','ejs');
app.use('/assets',express.static(path.join(__dirname, 'assets')));

//use port provided by heroku app. If it's not available use the 8080 port
var PORT = process.env.PORT || 8080
app.listen(PORT);

//created seperate file to deal with routes
var index = require('./routes/controller');
app.use('/',index);
console.log("listening on "+ PORT);
