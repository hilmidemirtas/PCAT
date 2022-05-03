const express = require('express');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')

const Photo = require('./models/Photo'); //photo schema include
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');

const app = express();

//connect
mongoose.connect('mongodb://localhost/pcat-veritabani');

//Template Engine
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload()); // default options
app.use(methodOverride('_method', {
  methods:[ 'POST', 'GET']
}));



//ROUTES

const port = 3000;

app.get('/',photoController.getAllPhotos );
app.get('/photos/:id',photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);




app.get('/about',pageController.getAboutPage );
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id',pageController.getEditPage);




//Port Operator
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda...`);
});
