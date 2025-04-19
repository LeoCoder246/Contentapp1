document.querySelector('.js-upload-video').addEventListener('click', () => {
  const sidebar = document.querySelector('.js-dashboard-sidebar');
  //<label for="videoFile" class="form-label">Choose Video:</label>
  //<input type="file" id="videoFile" name="videoFile" accept="video/*">
  // Clear existing content
  sidebar.innerHTML = "";
  sidebar.innerHTML = `<div>

  <h2>Upload Videos</h2>

  <form action="/content/video" method="POST" enctype="multipart/form-data" class="video-form">

    <label for="videoTitle" class="form-label">Title:</label>
    <input type="text" id="videoTitle" name="title" placeholder="Enter video title" required>

    <label for="videoFile" class="form-label">Upload Video:</label>
    <input type="file" id="videoFile" name="videoUrl" accept="video/*" required>

    <label for="thumbnailFile" class="form-label">Upload Thumbnail:</label>
    <input type="file" id="thumbnailFile" name="imageUrl" accept="image/*" required>

    <label for="description" class="form-label">Description:</label>
    <textarea id="description" name="description" placeholder="Enter video description" required></textarea>

    <label for="videoCategory" class="form-label">Select Category:</label>
    <select id="videoCategory" name="videoCategory" required>
      <option value="">-- Select Category --</option>
      <option value="Java">Java</option>
      <option value="Python">Python</option>
      <option value="MongoDB">MongoDB</option>
    </select>

    <button type="submit" class="btn-upload">Upload</button>

  </form>

</div>`;

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
  <form action="/content/notice" method="POST" class="video-form">

  <label for="notice" class="form-label">Notice:</label>
  <input type="text" id="notice" name="notice" placeholder="Enter Notice" required>


  <button type="submit" class="btn-upload">Upload</button>
</form>
</div>
  `;
});

document.querySelector('.js-upload-notes').addEventListener('click', () => {
  const sidebar = document.querySelector('.js-dashboard-sidebar');
  sidebar.innerHTML = "";
  sidebar.innerHTML = `
  <div>
  <h2>Upload Notice</h2>
  <form action="/content/notes" method="POST" enctype="multipart/form-data" class="video-form">

  <label for="notice" class="form-label">Notes:</label>
 

    <select id="SubjectName" name="SubjectName" required>
      <option value="">-- Select Category --</option>
      <option value="Java">Java</option>
      <option value="Python">Python</option>
      <option value="MongoDB">MongoDB</option>
    </select>
   
    
   <input type="text" id="chapterName"  name="chapterName" placeholder="Enter Chapter Name" required>
   <input type="number" id="chapterNumber" name="chapterNumber" placeholder="Enter Chapter Number" required>

     
    <label for="notesimage" class="form-label">Upload Image:</label>
    <input type="file" id="img1File" name="image" accept="image/*" required>

      <label for="notesContent" class="form-label">Upload Notes Content:</label>
    <textarea id="notesContent" placeholder="Enter Notes Content" name="notes" style="height: 100px;" required></textarea>

     <label for="notesExapple" class="form-label">Upload Notes Example:</label>
    <textarea id="notesContentEx" placeholder="Enter Notes Content example" name="codeExample" style="height: 100px;" required></textarea>
  <button type="submit" class="btn-upload">Upload</button>
</form>
</div>
  `;
});


document.getElementById("toggleButton").addEventListener("click", function() {
  let sidebar = document.getElementById("videoSidebar");
  if (sidebar.style.display === "none" || sidebar.style.display === "") {
    sidebar.style.display = "block"; // Show
  } else {
    sidebar.style.display = "none"; // Hide
  }
});