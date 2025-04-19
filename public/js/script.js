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
              <a href="/content/video/Java"> <div class="categorys" > 
                     <img class="sidebar-icons"  src="/icons/icons8-java-48.png"> <div class="sidebar-text">Java</div>
                        
                    
                </div>
              </a>
            </li>
            <li class="active">
             <a href="/content/video/Python">

              <div class="categorys" > 
                    <img class="sidebar-icons"  src="/icons/icons8-python-48.png"> <div class="sidebar-text">Python</div>
                    
                </div>
              </a>
            </li>
            <li class="active">
              <a href="/content/video/MongoDB">
              <div class="categorys"> 
                         <img class="sidebar-icons"  src="/icons/icons8-mongodb-48.png"> <div class="sidebar-text">MongoDB</div>
                       
                    </div>
                  </a> 
            </li>
            
    </div>`
  }
    sidebar.innerHTML = genrateHTML();

})




document.querySelector('.js-hamberger').addEventListener('click', () => {

})

