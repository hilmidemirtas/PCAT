const express = require('express');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')

const Photo = require('./models/Photo'); //photo schema include

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
app.use(methodOverride('_method'));



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

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await  Photo.findOne({_id: req.params.id});
  res.render('edit', {
    photo
  });
});


app.put('/photos/:id', async (req, res) => {
  const photo = await  Photo.findOne({_id: req.params.id});
  photo.title = req.body.title
  photo.description = req.body.description
  photo.save()
  res.redirect(`/photos/${req.params.id}`)
});

//Port Operator
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda...`);
});
