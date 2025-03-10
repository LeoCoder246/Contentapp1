require('dotenv').config();
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
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}
app.set('view engine','ejs');
app.set('views', path.resolve('./views'));
app.use(express.static('public'));

app.use('/',staticRouter);
app.use('/content', webcontentRouter)
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
