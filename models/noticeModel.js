const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  notice: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
},{timestamps: true});

 Notice = mongoose.model('Notice', noticeSchema);

 module.exports = Notice;