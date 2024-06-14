const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String },
  year: { type: Number },
  audio: { 
    data: Buffer, 
    contentType: String 
  }
});

const Song = mongoose.model('musics', songSchema);

module.exports = Song;
