const {Router} = require('express');
const webcontentRouter = Router();
const webcontentController = require('../controllers/webcontentController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const upload = require("../config/multer");
webcontentRouter.get('/videos', authMiddleware , webcontentController.getvideos);

webcontentRouter.post('/video',authMiddleware ,upload.fields([
  { name: "videoUrl", maxCount: 1 }, // Video file
  { name: "imageUrl", maxCount: 1 }, // Thumbnail image
]), webcontentController.postVideo);
webcontentRouter.get('/video/:category', authMiddleware , webcontentController.getvideosByCategory);
webcontentRouter.get('/video/:category/:id', authMiddleware , webcontentController.getVideoById);
webcontentRouter.post('/notice', authMiddleware, webcontentController.postnotice);
webcontentRouter.get('/notes',authMiddleware, webcontentController.getnotesTopics);

webcontentRouter.post('/notes', authMiddleware,upload.fields([{ name: 'image', maxCount: 1 }]), webcontentController.postNotes);
webcontentRouter.get('/notes/:SubjectName',authMiddleware, webcontentController.getnotesChapters);
webcontentRouter.get('/notes/:SubjectName/:id',authMiddleware, webcontentController.getnotesById);
module.exports = webcontentRouter;