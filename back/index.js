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
  if (err) { throw err; } else {
    console.log("Connected successfully to server with Mongoose");
    console.log("----------------");
  }
});

var db = mongoose.connection;
var carts = db.collection('carts');
var products = db.collection('products');
var customers = db.collection('customers');

// Deprecated method
/* mongoose.connect(url, function(err) {
   if (err) { throw err; } else {
     "Instruction diverses"
 } 
 }); */


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

// -----------------------------------------------------------------
// ---------------------------ROUTES--------------------------------
// -----------------------------------------------------------------

app.get('/cart/:id', function (req, res) {
  var _id = req.params.id;
    carts.find({ email: _id }).toArray(function (err, docs) {
      if (docs[0]) {
        if (docs[0].cart[0]) {
          res.status(200).send(docs[0].cart);
        } else {
          res.status(404).send({message: 'Cart empty. Hurry up ! Buy something !'});
        }
      } else {
        res.status(404).send({message: 'User not found'});
      }
    });
});
//----------------------------------------

app.post('/cart-add', function (req, res) {
  var body = req.body;
  carts.find({ email: body.email }).toArray(function (err, docs) {
    if (docs[0]) {
      // Verification, if the product is already present in the cart
      var found = false;
      for (var i = docs[0].cart.length - 1; i >= 0; i--) {
        if (docs[0].cart[i].ref == Number(body.ref)) {
          found = true;
        }
      }
      if (found == false) {
        products.find({ ref: Number(body.ref) }).toArray(function (err, docs) {
          if (docs[0]) {
            carts.update({ email: body.email }, { $addToSet: { cart: docs[0] } });
            res.status(200).send({ message: "Hop hop hop ! In the cart !" });
          } else {
            res.status(404).send({ message: 'No product found with the ref ' + body.ref });
          }
        });
      } else { // Pas de message, pourqoui ?
        res.status(400).send({ message: 'Already in the cart, Grand fou ( ͡° ͜ʖ ͡° )' })
      }
    } else {
      res.status(404).send({ message: 'No cart found for user ' + body.id });
    }
  });
});

// WARNING : "pull" delete all object with the same ref x
// if we have a product ref a with size 1 and a product ref a with size 2 => pull delete a size 1 and 2 !
// Send size and color in the body for verification .
app.post('/cart-delete', function (req, res) {
  var body = req.body;
  carts.find({ email: body.email }).toArray(function (err, docs) {
    if (docs[0]) {
      // Verification, if the product is present in the cart
      var found = false;
      // rajoutter une conditiron 'found = false'
      for (var i = docs[0].cart.length - 1; i >= 0; i--) {
        if (docs[0].cart[i].ref == Number(body.ref)) {
          found = true;
        }
      } if (found) {
        carts.update({ email: body.email }, { $pull: { cart: { ref : Number(body.ref) } } });
        // carts.update({ email: body.email }, { $pull: { "cart.ref": Number(body.ref) } });
        res.status(200).send({ message: "Hop hop hop ! Out of the cart !" });
      } else {
        res.status(404).send({ message: 'No product found with the ref ' + body.ref + ' in the cart' });
      }
    } else {
      res.status(404).send({ message: 'No cart found for user ' + body.id });
    }
  });
});

app.post('/cart-purge', function (req, res) {
  var body = req.body;
  carts.find({ email: body.email }).toArray(function (err, docs) {
    if (docs[0]) {
      if (docs[0].cart[0]) {
        carts.update({ email: body.email }, { "$set": { "cart": [] } });
        res.status(200).send({ message: "Hop hop hop ! Empty cart !" });
      } else {
        res.status(404).send({ message: 'Cart already empty, you ding-dong ( ͡° ͜ʖ ͡° )' });
      }
    } else {
      res.status(404).send({ message: 'No cart found for user ' + body.id });
    }
  });
});

// MUST ADD CONDITION FOR NOT REDUCE THE QUANTITY BELOW 1
app.post('/modify-quantity', function (req, res) {
  var body = req.body;
  var _ref = Number(body.ref);
  carts.find({ email: body.email }).toArray(function (err, docs) {
    if (docs[0]) {
      // Search the position of the product in the cart
      var found = false;
      for (var i = docs[0].cart.length - 1; i >= 0; i--) {
        if (docs[0].cart[i].ref == Number(body.ref)) {
          found = true;
          cartProdNumber = i;
          console.log("cartProdNumber = ", cartProdNumber);
        }
      } if (found) {
        if (body.modify == "+") {
          carts.update({ email: body.email }, { $inc: { ['cart.' + cartProdNumber + '.quantity']: +1 }});
          res.status(200).send({ message: "+1 to item quantity" });
        } else if (body.modify == "-") {
          carts.update({ email: body.email }, { $inc: { ['cart.' + cartProdNumber + '.quantity']: -1 } });
          res.status(200).send({ message: "-1 to item quantity" });
        } else {
          res.status(400).send({ message: 'Request UNACCEPTABLE !' });
        }
      } else {
        products.find({ ref: Number(body.ref) }).toArray(function (err, docs) {
          if (docs[0]) {
            carts.update({ email: body.email }, { $addToSet: { cart: docs[0] } });
            res.status(200).send({ message: "Hop hop hop ! In the cart !" });
          } else {
            res.status(404).send({ message: 'No product found with the ref ' + body.ref });
          }
        });
      }
    } else {
      res.status(404).send({ message: 'No cart found for user ' + body.id });
    }
  });
});

app.get('/products', function (req, res) {
  products.find({}).toArray(function (err, docs) {
    if (err) {
      res.status(500).send({message: 'Problem when retrieving product list'});
    } else {
      res.status(200).send(docs);
    }
  });
});

app.get('/product/:ref', function (req, res) {
  var _ref = Number(req.params.ref);
  products.find({ ref: _ref }).toArray(function (err, docs) {
    if (docs[0]) {
      res.status(200).send(docs[0]);
    } else {
      res.status(404).send({message: 'The product reference ' + _ref + ' is not associated with any product'});
    }
  });
});

app.get('/customer/:id', function (req, res) {
  var _id = req.params.id;
  customers.find({ email: _id }).toArray(function (err, docs) {
    if (docs[0]) {
      res.status(200).send(docs[0]);
    } else {
      res.status(404).send({message: 'No user with email ' + _id + ' found'});
      console.log(docs);
    }
  });
});

app.post('/login', function (req, res) {
  var body = req.body;
  if (body.email && body.password) {
    customers.find({ email: body.email }).toArray(function (err, docs) {
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
    customers.find({ email: body.email }).toArray(function (err, docs) {
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

        customers.save(newProfile);
        carts.save(newCart);

        res.status(200).send({ message: '┏(＾▽＾)┛ Welcome !┗(＾▽＾)┓' });
      }
    });
  } else {
    res.status(412).send({
      message: 'You should provide all the required fields: email, password'
    });
  }
});

app.get('/token-check/:token', function (req, res) {
  var token = req.params.token;
  if (tokenCheck(token)) {
    res.status(200).send(true);
  } else {
    res.status(404).send(false);
  }
});

// Stoping to use port 3000 because it's the default browser-sync port
app.listen(3457, function () {
  console.log('BACKEND LISTENING ON PORT 3457');
});