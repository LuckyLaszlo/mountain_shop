const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const url = 'mongodb://localhost:27017/mountain_shop';
var Product = require('./models/product.js');
var Customer = require('./models/customer.js');
var Cart = require('./models/cart.js');
var tokenList = [];

app.use(function (req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(url, { useMongoClient: true, }, function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Connected successfully to server with Mongoose");
    console.log("----------------");
  }
});

// Deprecated method
/* mongoose.connect(url, function(err) {
   if (err) { throw err; } else {
     "Instruction diverses"
 } 
 }); */

var db = mongoose.connection;

function randomToken() {
  var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = 0; i < 32; i++) {
    result += string[Math.floor(Math.random() * (string.length - 1))];
  }
  return result;
}

function tokenCheck(token) {
  var result = tokenList.find(function (element) {
    return element == token;
  });
  return result;
}

// Probleme Asynchrone
// function _findUser(x) {
//  var result = db.collection('customers').find({ email: x}).toArray(function(err, docs){
//    console.log('docs[0]:', docs[0].email);
//    return docs[0].email == x;
//  });
// return result;
// };

// "property" en tant que "email" ne fonctionne pas : ReferenceError: email is not defined. POURQUOI ?
// function _look(collection, property, value) {
//   return db.collection(collection).find({ property: value })
// };

// test look email, pas convaincue.
function _lookEmail(collection, value) {
  return db.collection(collection).find({ email: value })
};


app.get('/products', function (req, res) {
  db.collection('products').find({}).toArray(function (err, docs) {
    res.status(200).send(docs);
  });
});

app.get('/product', function (req, res) {
  db.collection('products').find({}).toArray(function (err, docs) {
    res.status(200).send(docs[0]);
  });
});

app.get('/customer/:id', function (req, res) {
  var id = req.params.id;
  _lookEmail('customers', id).toArray(function (err, docs) {
    res.status(200).send(docs[0]);
  });
});

// app.get('/customer/:id', function (req, res) {
//   var id = req.params.id;
//   db.collection('customers').find({ email: id }).toArray(function (err, docs) {
//     res.status(200).send(docs[0]);
//   });
// });

app.post('/login', function (req, res) {
  var body = req.body;
  if (body.email && body.password) {
    _lookEmail('customers', body.email).toArray(function (err, docs) {
      if (docs[0]) {
        if (docs[0].password == body.password) {
          var newToken = randomToken();
          tokenList.push(newToken);
          res.status(200).send({
            message: 'Login correct',
            token: newToken,
            email: docs[0].email
          });
        } else {
          res.status(412).send({
            message: 'Password does not match'
          });
        }
      } else {
        res.status(404).send({
          message: 'No account found with email: ' + body.email
        });
      }
    });
  } else {
    res.status(412).send({
      message: 'You should provide a correct email and a password!'
    });
  }
});

app.post('/register', function (req, res) {
  var body = req.body;
  if (body.email && body.password) {
    _lookEmail('customers', body.email).toArray(function (err, docs) {
      if (docs[0]) {
        res.status(409).send({
          message: 'User already exists with email: ' + body.email
        });
      } else {
        var newProfile = new Customer({
          email: body.email,
          password: body.password,
          firstName: body.firstName,
          lastName: body.lastName
        });
        db.collection('customers').save(newProfile);

        res.status(200).send({
          message: '┏(＾▽＾)┛ User created with success !┗(＾▽＾)┓'
        });
      }
    });
  } else {
    res.status(412).send({
      message: 'You should provide all the required fields: email, password'
    });
  }
});

// Stoping to use port 3000 because it's the default browser-sync port
app.listen(3457, function () {
  console.log('BACKEND LISTENING ON PORT 3457');
});