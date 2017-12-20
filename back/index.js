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

// "property" en tant que "email" ne fonctionne pas : ReferenceError: email is not defined. POURQUOI ?
// function _look(collection, property, value) {
//   return db.collection(collection).find({ property: value })
// };

// test look email, pas convaincue.
function _lookEmail(value) {
  return db.collection('customers').find({ email: value })
};


// -----------------------------------------------------------------
// ---------------------------ROUTES--------------------------------
// -----------------------------------------------------------------

app.get('/cart/:id', function (req, res) {
  var _id = req.params.id;
  db.collection('carts').find({ email: _id }).toArray(function (err, docs) {
    if (docs.cart[0]) {
      res.status(200).send(docs.cart);
    } else {
      res.status(200).send(message: 'Cart empty. Hurry up ! Buy something !');
    }

  });
});
//----------------------------------------
app.post('/cart-add/:id', function (req, res) {
  var _id = req.params.id;
  db.collection('carts').find({ email: _id }).toArray(function (err, docs) {
    if(docs[0]) {
      
    }
  });
});
//----------------------------------------
app.post('/cart-delete/:id', function (req, res) {
  var _id = req.params.id;
  var body = req.body;
  db.collection('carts').find({ email: _id }).toArray(function (err, docs) {
    if(docs[0]) {
    } else {
      // un truc ou ça redirige vers l\'accueil du site ? a voir comment faire
      res.status(404).send();
    }
  });
});
//----------------------------------------
app.post('/cart-purge/:id', function (req, res) {
  var _id = req.params.id;
  var body = req.body;
  db.collection('carts').find({ email: _id }).toArray(function (err, docs) {
    if(docs[0]) {
      res.status(200).send(message: "Are you sure you want to delete all your selection ?");
    } else {
      // un truc ou ça redirige vers l\'accueil du site ? a voir comment faire
      res.status(404).send();
    }
  });
});

// Cart WIP


app.get('/products', function (req, res) {
  db.collection('products').find({}).toArray(function (err, docs) {
    if(err) {
      res.status(500).send(message: 'Problem when retrieving product list');
    } else {
      res.status(200).send(docs);
    }
  });
});

app.get('/product/:ref', function (req, res) {
  var _ref = req.params.ref;
  db.collection('products').find({ ref : _ref }).toArray(function (err, docs) {
    if (docs[0]) {
      res.status(200).send(docs[0]);
    } else {
      res.status(404).send(message: 'The product reference ' + _ref + ' is not associated with any product');
    }
  });
});

app.get('/customer/:id', function (req, res) {
  var _id = req.params.id;
  _lookEmail(_id).toArray(function (err, docs) {
    if (docs[0]) {
      res.status(200).send(docs[0]);
    } else {
      res.status(404).send(message: 'No user with email ' + _id + ' found');
    }
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
    _lookEmail(body.email).toArray(function (err, docs) {
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
    _lookEmail(body.email).toArray(function (err, docs) {
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
        var newCart = new Cart({
          email: body.email,
          cart: []
        });

        db.collection('customers').save(newProfile);
        db.collection('carts').save(newCart);

        res.status(200).send({
          message: '┏(＾▽＾)┛ Registration complete. Welcome !┗(＾▽＾)┓'
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