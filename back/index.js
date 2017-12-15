
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mountain_shop';
var mongoose = require('mongoose');
var app = express();

app.use(function(req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(url, { useMongoClient: true, }, function(err) {
  if (err) { throw err; } else {
  console.log("Connected successfully to server with Mongoose");
  console.log("----------------");
  // console.log(mongoose.connection); 
}

// Deprecated method
/* mongoose.connect(url, function(err) {
   if (err) { throw err; } else {
   console.log("Connected successfully to server with Mongoose");
   console.log("----------------");
   // console.log(mongoose.connection); 
 } */

});

function _findUser(username) {
  var db = _client.db('mountain_shop');
 db.collection('customers').find({}).toArray(function(err, docs){
   return docs.username == username;
 });
};


app.get('/customers', function(req, res) {

  var db = _client.db('mountain_shop');

  db.collection('customers').find({}).toArray(function(err, docs) {
        res.status(200).send(docs);
  });
  
});

app.get('/customers/:id', function(req, res) {
  var id = req.params.id;
  var db = _client.db('mountain_shop');

  db.collection('customers').find({username: id}).toArray(function(err, docs) {
        res.status(200).send(docs);
  });
});

app.post('/login', function(req, res) {
  var body = req.body;

  if (body.username && body.password) {
    var db = _client.db('mountain_shop');
    db.collection('customers').find({username : body.username}).toArray(function(err, docs) {
        if (docs) {
          doc = docs[0];
          console.log(doc.password, body.password)
          if (doc.password == body.password) {
            res.status(200).send({message: 'Login correct'});
          } 
          else {
            res.status(412).send('Password does not match');
          }
        } 
        else {
          res.status(404).send('No account found with username: ' + body.username);
        }
    });

    
  } else {
    res.status(412).send('You should provide a correct username and a password!');
  }
});



app.post('/create-account', function(req, res) {
 var body = req.body;
  var db = _client.db('mountain_shop');
 if (body.username && body.password) {
   if (_findUser(body.username)) {
     res.status(409).send('User already exists with username: ' + body.username);
   } else {
     var newProfile = {
       username: body.username,
       password: body.password,
       firstName: body.firstName,
       lastName: body.lastName,
       age: body.age,
     };
     db.collection('customers').save(newProfile);

     res.status(200).send('User created with success :visage_légèrement_souriant: !');
  }
}
else{
  res.status(412).send('You should provide all the required fields: username, password');
}
});

// -----------------------------------------------------
// ----------------------Schema-------------------------

var productsSchema = new mongoose.Schema({
  ref: Number,
  type: String,
  name: String,
  brand: String,
  price: Number,
  message: String
  // osef : { type: String, match: /^[a-zA-Z0-9-_]+$/ },
});

var customersSchema = new mongoose.Schema({
  // email send by the front must be case insensitive :)
  email: String,
  password: String,
  creationDate: { type: Date, default: Date.now }
});



app.listen(3000, function() {
  console.log('BACKEND LISTENING ON PORT 3000');
});
