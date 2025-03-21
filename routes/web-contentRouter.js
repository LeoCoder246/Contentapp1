const {Router} = require('express');
const webcontentRouter = Router();
const webcontentController = require('../controllers/webcontentController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const Notice = require('../models/noticeModel');
webcontentRouter.get('/videos', authMiddleware , webcontentController.getvideos);

webcontentRouter.post('/video',authMiddleware , webcontentController.postVideo);
webcontentRouter.get('/video/:category/:id', authMiddleware , webcontentController.getVideoById);
webcontentRouter.post('/notice', authMiddleware, webcontentController.postnotice);
module.exports = webcontentRouter;