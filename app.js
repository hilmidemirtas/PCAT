const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');


const Photo = require('./models/Photo');

const app = express();

//connect
mongoose.connect('mongodb://localhost/pcat-veritabani');

//Template Engine
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//ROUTES

const port = 3000;

app.get('/', (req, res) => {
    /* res.send('merhaba') */
    res.render('index')
});

app.get('/about', (req, res) => {
    /* res.send('merhaba') */
    res.render('about')
});

app.get('/add', (req, res) => {
    /* res.send('merhaba') */
    res.render('add')
});

//post metodu
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda...`)
});