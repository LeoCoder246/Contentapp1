document.querySelector('.js-upload-container').addEventListener('click', () => {
  const sidebar = document.querySelector('.js-upload-main');
  sidebar.innerHTML = generateUploadOptions(); // Generate and inject HTML
});

// ✅ Generate upload menu HTML
function generateUploadOptions() {
  return `
    <div class="categorys-main">
      <li class="active">
        <div class="upload-forms-div js-upload-video sidebar-text">Upload Videos</div>
      </li>
      <li class="active">
        <div class="upload-forms-div js-upload-notes sidebar-text">Upload Notes</div>
      </li>
      <li class="active">
        <div class="upload-forms-div js-upload-notice sidebar-text">Upload Notices</div>
      </li>
    </div>
  `;
}

// ✅ Event delegation for dynamically added upload options
document.querySelector('.js-upload-main').addEventListener('click', function (event) {
  const sidebar = document.querySelector('.js-dashboard-sidebar');

  if (event.target.classList.contains('js-upload-video')) {
    sidebar.innerHTML = getVideoUploadForm();
  } else if (event.target.classList.contains('js-upload-notes')) {
    sidebar.innerHTML = getNotesUploadForm();
  } else if (event.target.classList.contains('js-upload-notice')) {
    sidebar.innerHTML = getNoticeUploadForm();
  }
});

// ✅ Upload Video form HTML
function getVideoUploadForm() {
  return `
    <div>
      <h2>Upload Videos</h2>
      <form action="/content/video" method="POST" enctype="multipart/form-data" class="video-form">
        <label for="videoTitle">Title:</label>
        <input type="text" id="videoTitle1" name="title" placeholder="Enter video title" required>
        
        <label for="videoFile">Upload Video:</label>
        <input type="file" id="videoFile" name="videoUrl" accept="video/*" required>

        <label for="thumbnailFile">Upload Thumbnail:</label>
        <input type="file" id="thumbnailFile" name="imageUrl" accept="image/*" required>

        <label for="description">Description:</label>
        <textarea id="description" name="description" required></textarea>

        <label for="videoCategory">Select Category:</label>
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
}

// ✅ Upload Notes form HTML
function getNotesUploadForm() {
  return `
    <div>
      <h2>Upload Notes</h2>
      <form action="/content/notes" method="POST" enctype="multipart/form-data" class="video-form">
        <label for="SubjectName">Select Subject:</label>
        <select id="SubjectName" name="SubjectName" required>
          <option value="">-- Select Category --</option>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
          <option value="MongoDB">MongoDB</option>
        </select>

        <input type="text" id="chapterName" name="chapterName" placeholder="Enter Chapter Name" required>
        <input type="number" id="chapterNumber" name="chapterNumber" placeholder="Enter Chapter Number" required>

        <label for="img1File">Upload Image:</label>
        <input type="file" id="img1File" name="image" accept="image/*" required>

        <label for="notesContent">Upload Notes Content:</label>
        <textarea name="notes" id="notesContent" required></textarea>

        <label for="notesContentEx">Upload Notes Example:</label>
        <textarea name="codeExample" id="notesContentEx" required></textarea>

        <button type="submit" class="btn-upload">Upload</button>
      </form>
    </div>
  `;
}

// ✅ Upload Notice form HTML
function getNoticeUploadForm() {
  return `
    <div>
      <h2>Upload Notice</h2>
      <form action="/content/notice" method="POST" class="video-form">
        <label for="notice">Notice:</label>
        <input type="text" id="notice" name="notice" placeholder="Enter Notice" required>
        <button type="submit" class="btn-upload">Upload</button>
      </form>
    </div>
  `;
}

// ✅ Toggle sidebar
document.getElementById("toggleButton").addEventListener("click", function () {
  let sidebar = document.getElementById("videoSidebar");
  sidebar.style.display = (sidebar.style.display === "none" || sidebar.style.display === "") ? "block" : "none";
});




document.getElementById("toggleButton").addEventListener("click", function () {
  let sidebar = document.getElementById("videoSidebar");
  if (sidebar.style.display === "none" || sidebar.style.display === "") {
    sidebar.style.display = "block"; // Show
  } else {
    sidebar.style.display = "none"; // Hide
  }
});






