const mongoose = require('mongoose');

const videoShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
 
  },
  imageUrl: {
    type: String,
    required: true,
  },
  videoCategory: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
},{timestamps: true});

 const Video = mongoose.model('Video', videoShema);

 module.exports = Video;