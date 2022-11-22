const MongoClient = require('mongodb').MongoClient;
let db            = null;
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DATABASE_URL;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
  console.log("Connected successfully to db server");

  // connect to badbankv7 database
  db = client.db('badbankv7');
});

// create user account
function create(email){
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    const doc = {email};
    collection.insertOne(doc, {w:1}, function(err, result) {
      err ? reject(err) : resolve(doc);
    });
  })
}

// deposit
function deposit(userid, email, description, amount, isDeposit, date){
  return new Promise((resolve, reject) => {
    const collection  = db.collection('transactions');
    const doc = {userid, email, description, amount, isDeposit, date};
    collection.insertOne(doc, {w:1}, function(err, result) {
      err ? reject(err) : resolve(doc);
    })
  })
}

// all transactions
function allTransactions(){
  return new Promise((resolve, reject) => {
    const transactions = db
      .collection('transactions')
      .find({})
      .toArray(function(err, docs) {
        err ? reject(err) : resolve(docs);
      })
  })
}

// all users
function all(){
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .find({})
      .toArray(function(err, docs) {
        err ? reject(err) : resolve(docs);
      })
  })
}

module.exports = {create, deposit, all, allTransactions};