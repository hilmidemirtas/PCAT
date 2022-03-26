const express = require('express');
const path = require('path');

const app = express();


//MIDDLEWARES
app.use(express.static('public'));

const port = 3000;

app.get('/', (req, res) => {
    res.send('merhaba')
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda...`)
});