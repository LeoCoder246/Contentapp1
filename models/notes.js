const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  SubjectName:{
    type:String,
    required:true,
  },
  chapterNumber:{
    type:Number,
    required:true,
  },
  chapterName:{
    type:String,
    required:true,
  },
  image:{
    type:String,
    required:true,
  },
  notes:{
    type:String,
    required:true,
  },
  codeExample:{
    type:String,
    required:true,
  },
  createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    } 
},{timestamps: true});
const Notes = mongoose.model('Note', noteSchema);

module.exports = Notes;