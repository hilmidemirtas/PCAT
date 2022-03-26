const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

//Template Engine
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static('public'));

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

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda...`)
});