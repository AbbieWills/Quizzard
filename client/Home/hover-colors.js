document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector(".nav");
    const footer = document.querySelector(".footer");
    const images = document.querySelectorAll(".hover-image");
    const crestHover = document.querySelector(".crest");
    const crestHover2 = document.querySelector(".crest2");
  
    images.forEach(function(image) {
      const color = image.getAttribute("data-color");
  
      image.addEventListener("mouseover", function() {
        navbar.style.backgroundColor = color;
        footer.style.backgroundColor = color;
        footer.style.color = "white"
        navbar.style.color = "white"
        crestHover.style.filter = "brightness(100%)";
        crestHover2.style.filter = "brightness(100%)";
      });
  
      image.addEventListener("mouseout", function() {
        navbar.style.backgroundColor = "";
        footer.style.backgroundColor = "";
        footer.style.color = "";
        navbar.style.color = "";
        crestHover.style.filter = "brightness(0%)";
        crestHover2.style.filter = "brightness(0%)";
      });
    });
  });
  
  
  
  