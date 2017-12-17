
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const app = express();
const url = 'mongodb://localhost:27017/mountain_shop';
var Product = require('./models/product.js');
var Customer = require('./models/customer.js');
var Cart = require('./models/cart.js');


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
  // console.log("----------------");
}
});

var db = mongoose.connection;

// Deprecated method
/* mongoose.connect(url, function(err) {
   if (err) { throw err; } else {
     "Instruction diverses"
 } 
 }); */

// function _findUser(x) {
//  var result = db.collection('customers').find({ email: x}).toArray(function(err, docs){
//    console.log('docs[0]:', docs[0].email);
//    return docs[0].email == x;
//  });
// };


app.get('/customers', function(req, res) {
  db.collection('customers').find({}).toArray(function(err, docs) {
        res.status(200).send(docs);
  });
});

app.get('/customers/:id', function(req, res) {
  var id = req.params.id;
  db.collection('customers').find({lastName: id}).toArray(function(err, docs) {
        res.status(200).send(docs);
  });
});

app.post('/login', function(req, res) {
  var body = req.body;
 console.log('Le body: ', body);
  if (body.email && body.password) {

    db.collection('customers').find({ email: body.email }).toArray(function(err, docs) {
        if (docs[0]) {
          if (docs[0].password == body.password) {
            res.status(200).send({message: 'Login correct'});
          } 
          else {
            res.status(412).send('Password does not match');
          }
        } 
        else {
          res.status(404).send('No account found with email: ' + body.email);
        }
    });

    
  } else {
    res.status(412).send('You should provide a correct email and a password!');
  }
});



app.post('/register', function(req, res) {
 var body = req.body;
 if (body.email && body.password) {
   db.collection('customers').find({ email: body.email }).toArray(function(err, docs) {
     if (docs[0]) {
       console.log('doc  ', docs);
     res.status(409).send('User already exists with email: ' + body.email);
   } else {
     var newProfile = new Customer({
       email: body.email,
       password: body.password,
       firstName: body.firstName,
       lastName: body.lastName,
      });
      db.collection('customers').save(newProfile);
      
    //  var newProfile = {
    //    email: body.email,
    //    password: body.password,
    //    firstName: body.firstName,
    //    lastName: body.lastName,
    //    age: body.age,
    //  };
    //  db.collection('customers').save(newProfile);

     res.status(200).send('User created with success :visage_légèrement_souriant: !');
  }
});
}
else{
  res.status(412).send('You should provide all the required fields: email, password');
}
});

// Stoping to use port 3000 because it's the default browser-sync port
app.listen(3457, function() {
  console.log('BACKEND LISTENING ON PORT 3457');
});
