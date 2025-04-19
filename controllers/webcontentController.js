
const Notice = require('../models/noticeModel');
const Video = require('../models/videoModels');
const Notes = require('../models/notes');
const cloudinary = require("../config/cloudinary");
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
 
  const notices = await Notice.create({
    notice: req.body.notice,
    createdBy: req.user._id
  })


  res.redirect('/home');
};

exports.postNotes = async (req, res) => {
try{
  if (!req.files || !req.files.image || !req.body.notes) {
    return res.status(400).send("Both image and notes are required.");
  }
  const imageResult = await new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { folder: "ImageNotes" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    upload.end(req.files.image[0].buffer); // Sending the image buffer
  });
 
  const notes = await Notes.create({
    SubjectName: req.body.SubjectName,
    chapterNumber: req.body.chapterNumber, // Ensure the correct field is used
    chapterName: req.body.chapterName, // Ensure the correct field is used
    
    image: imageResult.secure_url,
    notes: req.body.notes,
    codeExample: req.body.codeExample,
    createdBy: req.user._id
  })

  res.redirect('/content/notes'); // Redirect after upload
} catch (err) {
    console.error("Upload error:", err);
    res.status(500).send("Upload failed.");
  }

  
}
const uploadToCloudinary = (fileBuffer, options) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    uploadStream.end(fileBuffer);
  });
};
exports.postVideo = async (req, res) => {
  try {
    if (!req.files || !req.files.videoUrl || !req.files.imageUrl) {
      return res.status(400).send("Both video and thumbnail are required.");
    }

    // Upload video to Cloudinary
    const videoResult = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "videos" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      upload.end(req.files.videoUrl[0].buffer); // Sending the video buffer
    });

    // Upload image to Cloudinary
    const imageResult = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: "thumbnails" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      upload.end(req.files.imageUrl[0].buffer); // Sending the image buffer
    });

    // Save in MongoDB
    const newVideo = await Video.create({
      title: req.body.title || "Untitled",
      description: req.body.description,
      videoUrl: videoResult.secure_url,  // ✅ Fixed
      imageUrl: imageResult.secure_url,  // ✅ Fixed
      videoCategory: req.body.videoCategory,
      createdBy: req.user._id,
    });

    res.redirect("/content/videos"); // Redirect after upload
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).send("Upload failed.");
  }
};
exports.deleteVideo = async (req, res) => {
  try {
  const videoId = req.params.id;
  await Video.findByIdAndDelete(videoId);
  res.redirect('/content/videos');
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).send("Server error!");
  }
};
exports.getVideoById = async (req, res) => {
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

      const videoId = req.params.id;
      const category = req.params.category; // Get the category from the request parameters
  
      const video = await Video.findById(videoId).populate('createdBy');
      
      if (!video) {
          return res.status(404).send("Video not found!");
      }

      res.render('web-content/videopage', { video,   user: req.user ,category,notices });
  } catch (error) {
      console.error("Error fetching video:", error);
      res.status(500).send("Server error!");
  }
};


exports.getvideosByCategory = async (req, res) => {
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
 



    const category = req.params.category; // Log the category to see if it's correct


    const videos = await Video.find({  videoCategory: category }).sort({ createdAt: -1 }).populate('createdBy');
    
    if (!videos.length) {
      return res.status(404).send('No videos found for this category!');
    }

    res.render('web-content/category', { user: req.user, videos,notices,category});
  } catch (err) {
    console.error('Error fetching videos by category:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getnotesTopics = async (req, res) => {
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

  res.render('web-content/notes', { user: req.user,notices });
}

exports.getnotesChapters = async (req, res) => {
  const category = req.params.SubjectName;
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
    const notes = await Notes.find({ SubjectName: category });
  

    res.render('web-content/notesCatlogue', { notes, user: req.user ,notices });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send("Server Error");
  }
};

exports.getnotesById = async (req, res) => {
  try{
    id = req.params.id;
    const notes = await Notes.findById(id).populate('createdBy');
    if (!notes) {
      return res.status(404).send("Notes not found!");
    }
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
  
    res.render('web-content/notesPage', { notes, user: req.user ,notices });

  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send("Server error!");
  }
}