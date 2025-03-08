require('dotenv').config();
const express = require('express');
const path = require('path');
const staticRouter = require('./routes/staticRouter');
const webcontentRouter = require('./routes/web-contentRouter');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

connectDB();
const PORT = 3000;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); 

app.set('view engine','ejs');
app.set('views', path.resolve('./views'));
app.use(express.static('public'));

app.use('/',staticRouter);
app.use('/content', webcontentRouter)
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})