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
    }else{
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 2); // Subtract 3 days
        threeDaysAgo.setHours(0, 0, 0, 0); // Set time to 00:00:00
        // Fetch notices from the last 3 days
        const now = new Date();
        const notices = await Notice.find({
          createdAt: { $gte: threeDaysAgo,  $lte: now} // Get data where createdAt is >= threeDaysAgo
        })
        .sort({ createdAt: -1 }) // Sort by latest first
        .populate('createdBy');
     //console.log('this is notices',notices)
    const videos = await Video.find().sort({ createdAt: -1 });
    res.render('staticViews/dashboard', { user: req.user, videos,notices }); // ✅ Pass user data to view
    }
   
});



staticRouter.get('/logout', (req, res) => {
    res.clearCookie('token');  // 🔹 Remove token
    res.redirect('/login');     // 🔹 Redirect to login
});

module.exports = staticRouter;
