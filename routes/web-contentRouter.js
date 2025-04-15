const {Router} = require('express');
const webcontentRouter = Router();
const webcontentController = require('../controllers/webcontentController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const Notice = require('../models/noticeModel');
const upload = require("../config/multer");
webcontentRouter.get('/videos', authMiddleware , webcontentController.getvideos);

webcontentRouter.post('/video',authMiddleware ,upload.fields([
  { name: "videoUrl", maxCount: 1 }, // Video file
  { name: "imageUrl", maxCount: 1 }, // Thumbnail image
]), webcontentController.postVideo);
webcontentRouter.get('/video/:category/:id', authMiddleware , webcontentController.getVideoById);
webcontentRouter.post('/notice', authMiddleware, webcontentController.postnotice);
module.exports = webcontentRouter;