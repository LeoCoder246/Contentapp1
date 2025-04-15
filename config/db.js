
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
  await mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB');
  }catch(err) {
  console.log('Error connecting to MongoDB', err);
  };
}
module.exports = connectDB;