const express = require('express');
const { getHome, postLogin, getRegister, postRegister, getLogin , getlandingPage } = require('../controllers/staticControllers');
const Video = require('../models/videoModels');
const staticRouter = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
staticRouter.get('/', getlandingPage);
staticRouter.get('/home',authMiddleware, getHome);
staticRouter.get('/register', getRegister);
staticRouter.get('/login', getLogin);
staticRouter.post('/login', postLogin);
staticRouter.post('/register', postRegister);

staticRouter.get('/dashboard',authMiddleware, async (req, res) => { //adminMiddleware, 
    if (!req.user) {
        return res.redirect('/login'); // 🔹 Redirect if no user
    }
    const videos = await Video.find().sort({ createdAt: -1 });
    res.render('staticViews/dashboard', { user: req.user, videos }); // ✅ Pass user data to view
});



staticRouter.get('/logout', (req, res) => {
    res.clearCookie('token');  // 🔹 Remove token
    res.redirect('/login');     // 🔹 Redirect to login
});

module.exports = staticRouter;
