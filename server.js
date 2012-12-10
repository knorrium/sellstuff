
/**
 * Module dependencies.
 */

 var express = require('express'),
 http = require('http'),
 path = require('path'),
 crypto = require('crypto');

 var app = express();

 app.mongoose = require('mongoose'),
 app.db = app.mongoose.connect('mongodb://localhost/mydb'),
 app.Schema = app.mongoose.Schema;

 var Item = new app.Schema({
  title: String,
  description: String,
  slug: String,
  price: String,
  tags: [String],
  pictures: [String]
});

 app.mongoose.model('Item', Item);

 var User = new app.Schema({
  username: String,
  password: String
});

 app.mongoose.model('User', User);

 app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret:'storesecret' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

 app.configure('development', function() {
  app.use(express.errorHandler());
});

 app.checkLogin = function(req, res) {
  if (req.session && req.session.loggedIn === true) {
    return true;
  }
  else {
    return false;
  }
}

app.hashString = function (value) {
  hash = crypto.createHash('sha1');
  hash.update(value);
  return hash.digest('hex');
}

require('./routes/routes.js')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
