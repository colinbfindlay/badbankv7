var express  = require('express');
var app      = express();
var cors     = require('cors');
var dal      = require('./dal.js');
const admin = require('./admin');


// used to server static files from public directory
app.use(express.static('public'));
app.use(cors());


// create user account
app.get('/account/create/:email', function (req, res) {
  dal.create(req.params.email)
    .then((user) => {
      console.log(user);
      res.send(user);
    })
});

// Deposit
app.get('/transactions/deposit/:userid/:email/:description/:amount/:isdeposit/:date', function (req, res) {
  dal.deposit(req.params.userid, req.params.email, req.params.description, req.params.amount, req.params.isdeposit, req.params.date)
    .then((deposit) => {
      console.log(deposit);
      res.send(deposit);
    })


})

// Transaction List
app.get('/transactions/all', function (req, res) {
    // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);
  
    //check, did they pass us the token?
    //if not, do a 401 error
    if (!idToken) {
      res.status(401).send();
      return
    } 
  
    //check if verify id token was successful
    //if not, do 401
  
    //verify token, is this token valid?
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
           //res.send('Authentication Success!');
        }).catch(function(error) {
            console.log('error:', error);
            res.status(401).send("Token invalid!");
        });

  // This part is the same as unsecured...
  dal.allTransactions()
    .then((docs) => {
      console.log(docs);
      res.send(docs);
    })
})



// all accounts
app.get('/account/all', function (req, res) {

  // read token from header
  const idToken = req.headers.authorization
  console.log('header:', idToken);

  //check, did they pass us the token?
  //if not, do a 401 error
  if (!idToken) {
    res.status(401).send();
    return
  } 

  //check if verify id token was successful
  //if not, do 401

  //verify token, is this token valid?
  admin.auth().verifyIdToken(idToken)
      .then(function(decodedToken) {
          console.log('decodedToken:',decodedToken);
         //res.send('Authentication Success!');
      }).catch(function(error) {
          console.log('error:', error);
          res.status(401).send("Token invalid!");
      });

  // I'm sure this can be improved...Should make it conditional...The above code will throw an error and stop if there's no token.
  dal.all()
  .then((docs) => {
    console.log(docs);
    res.send(docs);
  });



  /*
  dal.all()
    .then((docs) => {
      console.log(docs);
      res.send(docs);
    });
  */

});



var port = 3001;
app.listen(port);
console.log('Running on port: ' + port);


