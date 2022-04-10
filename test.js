const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect
mongoose.connect('mongodb://localhost/pcat-veritabanı');


//Create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// Create A Photo 

/* Photo.create({
  title: 'Photo Title 1',
  description: 'Photo description 1 lorem ipsum',
});
 */

/* Photo.find({}, (err, data)=> {
    console.log(data);
}); */