document.querySelector('.js-upload-video').addEventListener('click', () => {
  const sidebar = document.querySelector('.js-dashboard-sidebar');
  //<label for="videoFile" class="form-label">Choose Video:</label>
  //<input type="file" id="videoFile" name="videoFile" accept="video/*">
  // Clear existing content
  sidebar.innerHTML = "";
  sidebar.innerHTML = `<div >

  <h2>Upload Videos</h2>
 
<form action="/content/video" method="POST" class="video-form">

  <label for="videoTitle" class="form-label">Title:</label>
  <input type="text" id="videoTitle" name="title" placeholder="Enter video title" required>

  
  
    <label class="form-label">Enter imageUrl</label>
    <input type="text" id="imageUrl" name="imageUrl" ">
   
  <label for="description" class="form-label">Description:</label>
  <textarea type="text" id="description" name="description" placeholder="Enter video description " required></textarea>

  <label for="videoCategory" class="form-label">Select Category:</label>
  <select id="videoCategory" name="videoCategory" required>
      <option value="">-- Select Category --</option>
      <option value="Java">Java</option>
      <option value="Python">Python</option>
      <option value="MongoDB">MongoDB</option>
  </select>

  <button type="submit" class="btn-upload">Upload</button>
</form>
  </div>
`;
});

document.querySelector('.js-upload-announcement').addEventListener('click', () => {
  const sidebar = document.querySelector('.js-dashboard-sidebar');

  // Clear existing content
  sidebar.innerHTML = "";
  sidebar.innerHTML = `<div>
  <h2>Upload Announcement</h2>
  <form action="/content/video" method="POST" class="video-form">
\

  <label for="announcement" class="form-label">Announcement:</label>
  <textarea type="text" id="announcement" name="announcement"class="announcement-textarea" placeholder="Enter Announcement " required></textarea>

  
  <button type="submit" class="btn-upload">Upload</button>
</form>
<div>
  `;
});

document.querySelector('.js-upload-notice').addEventListener('click', () => {
  const sidebar = document.querySelector('.js-dashboard-sidebar');
  sidebar.innerHTML = "";
  sidebar.innerHTML = `
  <div>
  <h2>Upload Notice</h2>
  <form action="/content/upload-video" method="POST" class="video-form">

  <label for="notice" class="form-label">Notice:</label>
  <input type="text" id="notice" name="notice" placeholder="Enter Notice" required>


  <button type="submit" class="btn-upload">Upload</button>
</form>
</div>
  `;
});