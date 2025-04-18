const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const path = require('path');
const staticRouter = require('./routes/staticRouter');
const webcontentRouter = require('./routes/web-contentRouter');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

connectDB();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); 

app.set('view engine','ejs');
app.set('views', path.resolve('./views'));
app.use(express.static('public'));

app.use('/',staticRouter);
app.use('/content', webcontentRouter)
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
  });
  
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

/*  dvbzhyt6g 
    985391149545777 
    sHNGy30PQ08zGCUkEvBEe_fvn_o
*/  