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
    // let streets = user.addresses[0].street;
    // let citys = user.addresses[0].city;
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

app.post('/delete/:userId', function(req, res){
  User.findOne({_id:req.params.userId}).then(function(user){
    console.log(user)
  }).catch(function(){
    console.log("Nah");
  })
  User.deleteOne({_id:req.params.userId})
  .catch(function(error, a, b){
    console.log(error);
  })
  res.redirect('/')
})

app.post('/update/:userId', function(req, res){
  let id = req.params.userId;
  res.redirect('/updateUser/' + id);
})

app.get('/updateUser/:userId', function(req, res){
  User.findOne({_id:req.params.userId}).then(function(user){

    res.render('update', {firstName: user.firstName, lastName: user.lastName, street: user.addresses[0].street, city: user.addresses[0].city, _id: user._id});
  })
})

app.post('/updateUser',function(req, res){
  let newFName = req.body.first_name;
  let newlName = req.body.last_name;
  let newStreet = req.body.street;
  let newCity = req.body.city;
  let ident = req.body.ident;
  console.log(ident);
  User.updateOne({_id:ident},{
    firstName: newFName,
    lastName: newlName,
    addresses: {city: newCity, street: newStreet}
  }).catch(function(error, affected, resp){
    console.log(error);
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
