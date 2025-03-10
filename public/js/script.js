document.getElementById("toggleButton").addEventListener("click", function() {
  let sidebar = document.getElementById("videoSidebar");
  if (sidebar.style.display === "none" || sidebar.style.display === "") {
    sidebar.style.display = "block"; // Show
  } else {
    sidebar.style.display = "none"; // Hide
  }
});


document.querySelector('.js-category-container').addEventListener('click', () => {
  const sidebar = document.querySelector('.js-category-main'); // Select the sidebar
  sidebar.innerHTML = ""; // Clear the sidebar
  
  

  const genrateHTML=() => {
  return  `<div class="categorys-main">
 <li class="active" >
              <a href="/content/video/java"> <div class="categorys" > 
                     <img class="sidebar-icons"  src="/icons/icons8-home-48.png"> 
                        <div class="sidebar-text">JAVA</div>
                    
                </div>
              </a>
            </li>
            <li class="active">
              <a href="/content/video/<%= video.category %>">
              <div class="categorys" > 
                    <img class="sidebar-icons"  src="/icons/icons8-about-48.png"> <div class="sidebar-text">VIDEOS</div>
                    
                </div>
              </a>
            </li>
            <li class="active">
              <a href="/content/video/<%= video.category %>">
              <div class="categorys"> 
                         <img class="sidebar-icons"  src="/icons/icons8-contact-us-50.png"> <div class="sidebar-text">CONTACT</div>
                       
                    </div>
                  </a> 
            </li>
            
    </div>`
  }
    sidebar.innerHTML = genrateHTML();

})


