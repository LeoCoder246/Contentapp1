const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://root:root@leocoder.a9thl.mongodb.net/blackdb?retryWrites=true&w=majority&appName=LeoCoder';

const connectDB = async () => {
  try {mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB');
}
catch(err) {
  console.log('Error connecting to MongoDB', err);
};
}
module.exports = connectDB;