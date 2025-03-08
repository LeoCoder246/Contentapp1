const jwt = require('jsonwebtoken');
const { verifyToken } = require('../service/jwtService');

function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    
    if (!token) {
        return res.redirect('/login');  // 🔹 Redirect if no token
    }

    try {
        const user = verifyToken(token);
        req.user = user;  // Attach user data to request
        next();
    } catch (error) {
        console.error("Invalid token:", error);
        res.clearCookie('token'); // 🔹 Clear invalid token
        res.redirect('/login');
    }
}

module.exports = authMiddleware;
