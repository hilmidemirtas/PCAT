const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PhotoSchema = new Schema({
    title: String,
    description: String,
    image: String,
    dateCreated: {
        type: Date,
        default: Date.now  //Default
    }
  });

  const Photo = mongoose.model('Photo', PhotoSchema);

  module.exports = Photo;
  

