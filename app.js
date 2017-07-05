const express = require('express');
const mongoose = require('mongoose');
const mustacheExpress = require('mustache-express');
mongoose.Promise = require('bluebird');
var app = express();
const bodyParser = require('body-parser');
var app = express();
// Replace "test" with your database name.
const User = require('./user.js');
mongoose.connect('mongodb://localhost:27017/test');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
// app.use(express.static('./public'));


app.get('/', function(req, res){
  User.find().then(function(user){

  res.render('index', {users: user});
}).catch(function(){
  console.log('sorry something when wrong.')
})
})

app.post("/createUser", function(req, res){
  let fName = req.body.first_name;
  let lName = req.body.last_name;
  let street = req.body.street;
  let city = req.body.city;
  let user = new User({firstName: fName, lastName: lName, addresses:{city:city, street:street}});
  user.save().then(function(){
    console.log('A new user has been saved!');
  }).catch(function(){
    console.log("Something seems to be wrong");
  })
  res.redirect('/')
})


app.listen(3000, function(req, res){
  console.log('You are here.');
})







// var user = new User({firstName: "Jarule", lastName: "Canada"});

// User.updateOne({firstName:'Waffle'},{
//
//   firstName: 'WafflePan',
//   $push : {addresses: {
//     street: "Richmond",
//     city: "Housten"
//   }}

// }).catch(function(error, affected, resp){
//   console.log(error);
// })


// user.save().then(function(){
//   console.log("This user has been saved.");
// })
// .catch(function(){
//   console.log('something has happened');
// })
// console.log(user);
//
//
// User.create({firstName: 'Jim', lastName: "Bean"}).then(function(){
//   console.log("He has been saved too.");
// }).catch(function(){
//   console.log('Yo something happened down here.');
// })
//
// console.log(user);
