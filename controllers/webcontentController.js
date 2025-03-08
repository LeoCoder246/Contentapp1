
const Notice = require('../models/noticeModel');
const Video = require('../models/videoModels');
exports.getvideos = async(req,res) => {
  try {
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
 const videos = await Video.find().sort({ createdAt: -1 }).populate('createdBy');
  res.render('web-content/videos', { user: req.user , notices , videos});
} catch (err) {
  console.error('Error fetching notices:', err);
  res.status(500).send('Internal Server Error');
}
}

exports.postnotice = async (req, res) => {
 // console.log("Request Body:", req.body);
  const notices = await Notice.create({
    notice: req.body.notice,
    createdBy: req.user._id
  })


  //console.log('this is req.user',req.user)
  res.redirect('/content/videos');
};



exports.postVideo = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const {title, description, videoUrl,imageUrl, videoCategory} = req.body;
  const video = await Video.create({
    title,
    description,
    videoUrl,
    imageUrl,
    videoCategory,
    createdBy: req.user._id
  });
  res.redirect('/content/videos');
}