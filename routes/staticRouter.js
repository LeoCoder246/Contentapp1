const express = require('express');
const { getHome, postLogin, getRegister, postRegister, getLogin , getlandingPage } = require('../controllers/staticControllers');
const staticRouter = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
staticRouter.get('/', getlandingPage);
staticRouter.get('/home',authMiddleware, getHome);
staticRouter.get('/register', getRegister);
staticRouter.get('/login', getLogin);
staticRouter.post('/login', postLogin);
staticRouter.post('/register', postRegister);

staticRouter.get('/dashboard',authMiddleware,(req, res) => { //adminMiddleware, 
    if (!req.user) {
        return res.redirect('/login'); // 🔹 Redirect if no user
    }

    res.render('staticViews/dashboard', { user: req.user }); // ✅ Pass user data to view
});



staticRouter.get('/logout', (req, res) => {
    res.clearCookie('token');  // 🔹 Remove token
    res.redirect('/login');     // 🔹 Redirect to login
});

module.exports = staticRouter;
