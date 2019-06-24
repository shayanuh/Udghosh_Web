// ----------------- Node modules ------------

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const async=require('async');
const assert = require('assert');
const crypto = require('crypto');

// ------- Firebase settings --------------

var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyDnqgkjVefZFr-jHJqFCHkac-tGOdRwJG4",
  authDomain: "udghoshregistration.firebaseapp.com",
  databaseURL: "https://udghoshregistration.firebaseio.com",
  projectId: "udghoshregistration",
  storageBucket: "",
  messagingSenderId: "83845558524",
  appId: "1:83845558524:web:6b073349da2c723c"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// we need to have a ID (unique) for adding data to the system
function writeUserData(item) {
  firebase.database().ref('users/2').set(item);
};

// ---------- All setting done --------------

var udg_champ_user = ''; // U_ID for champs reg
var nossq_user = ''; // U_ID for nossq reg

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var server=app.listen(app.get('port'), function(){
  console.log('Server started on port '+app.get('port'));
});

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// ---------- GET Requests --------------
// udg_champ main website
app.get('/udg_champ', function(req,res,next){
	res.render('udg_champ');
});

// Google Auth Champ
app.get('/udg_champ_google', function(req,res,next){
	res.render('udg_champ_google');
});

// Registration Champ
app.get('/udg_champ_form', function(req,res,next){
	res.render('udg_champ_form');
});

// nossq main page
app.get('/nossq', function(req,res,next){
  res.render('nossq');
});

// nossq registration google
app.get('/nossq_1_form', function(req,res,next){
  res.render('nossq_reg_google');
});

// nossq reg 2nd form
app.get('/nossq_2_form', function(req,res,next){
  res.render('nossq_reg_form');
});

// error
app.get('/404', function(req,res,next){
  res.render('404');
});

// brochure
app.get('/brochure', function(req,res,next){
  res.render('brochure');
});

// CA
app.get('/CA', function(req,res,next){
  res.render('CA');
});

// Gallery
app.get('/gallery', function(req,res,next){
  res.render('gallery');
});

// Main
app.get('/', function(req,res,next){
  res.render('index');
});

// Main form 1
app.get('/index_1', function(req,res,next){
  res.render('index_1');
});

// Main form 2
app.get('/index_2', function(req,res,next){
  res.render('index_2');
});

// Pronights
app.get('/pronights', function(req,res,next){
  res.render('pronights');
});

// Social
app.get('/social', function(req,res,next){
  res.render('social');
});

// Team
app.get('/team', function(req,res,next){
  res.render('team');
});

// ---------- POST Requests --------------

// Form requests for google first auth udg_champ
app.post('/udg_champ_1_form', function(req,res,next){
  // google auth system from firebase
  // setting global value of the username
  res.redirect('/udg_champ_form');
});


// Form requests for second auth udg_champ
app.post('/udg_champ_2_form', function(req,res,next){

    var item ={
    Participant_Name : req.body.name,
    Contact_Details : req.body.phone1,
    Alter_Contact_Details : req.body.phone2,
    Contact_Mail : req.body.mail,
    City : req.body.city
  };
  
  writeUserData(item);

  res.redirect("/udg_champ");

});

// Form requests for google first auth udg_champ
app.post('/nossq_1_form', function(req,res,next){
  // google auth system from firebase
  // setting global value of the username
  res.redirect('/nossq_2_form');
});


// Form requests for second auth udg_champ
app.post('/nossq_2_form', function(req,res,next){

    var item ={
    Participant_Name : req.body.name,
    Contact_Details : req.body.phone1,
    Alter_Contact_Details : req.body.phone2,
    Contact_Mail : req.body.mail,
    City : req.body.city
  };
  
  writeUserData(item);

  res.redirect("/nossq");

});

// Form for main website Google

// Form requests for google first auth udg_champ
app.post('/register-1', function(req,res,next){
  // google auth system from firebase
  // setting global value of the username
  res.redirect('/nossq_2_form');
});

// Form for main website step2
app.post('/register-2', function(req,res,next){

    var item ={
    Participant_Name : req.body.name,
    Contact_Details : req.body.phone1,
    Alter_Contact_Details : req.body.phone2,
    Contact_Mail : req.body.mail,
    City : req.body.city
  };
  
  writeUserData(item);

  res.redirect("/nossq");

});