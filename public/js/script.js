document.getElementById("toggleButton").addEventListener("click", function() {
  let sidebar = document.getElementById("videoSidebar");
  if (sidebar.style.display === "none" || sidebar.style.display === "") {
    sidebar.style.display = "block"; // Show
  } else {
    sidebar.style.display = "none"; // Hide
  }
});



