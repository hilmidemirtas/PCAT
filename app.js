const express = require('express');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const Photo = require('./models/Photo');

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

//ROUTES

const port = 3000;

app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');

  res.render('index', {
    photos,
  });
});

app.get('/about', (req, res) => {
  /* res.send('merhaba') */
  res.render('about');
});

app.get('/photos/:id', async (req, res) => {
  //asenkron yapı
  /* res.send('merhaba') */
  /*  console.log(req.params.id) */
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/add', (req, res) => {
  /* res.send('merhaba') */
  res.render('add');
});

//post metodu
app.post('/photos', async (req, res) => {
  /* await Photo.create(req.body);
  res.redirect('/'); */

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads' + uploadeImage.name,
    });
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda...`);
});
