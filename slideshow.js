/*
  Final Project
   Reiki By Jake
   Author: Jacob Fletcher
   Date: 11/22/2015 
   
   Functions

   addEvent(object, evName, fnName, cap)
      Run the function fnName when the event evName occurs in object.

   setupSlideshow()
      Sets up the slideshow by locating all slide images in the document
      and then runs function to create the slide gallery and page
      overlay.

   createHighRes(thumb, index)
      Creates image objects containing high resolution versions of the
      thumbnail images by attaching the high res versions as a custom
      property.

   createRollover(thumb)
      Creates image objects to act as rollover images for the thumbnail
      images in the document.

   createGallery(slides)
      Creates an HTML fragment for a slide gallery containing a close button,
      a slide image, navigation buttons, and a slide caption.

   showGallery()
      Shows the slide gallery using a fade-in effect.

   changeSlide(slide)
      Changes the current slide in the gallery to the slide parameter.

   createOverlay()
      Creates a page overlay obscuring the page content when the slide gallery
      is visible.

   setOpacity(objID, value)  
      Set the opacity of the document object with the id, objID to value.

   fadeIn(objID, maxOpacity, fadeTime, delay)
      Fades in an object with the id, objID up to a maximum opacity of 
      maxOpacity over an interval of fadeTime seconds with a delay of
      delay seconds.

   fadeOut(objID, maxOpacity, fadeTime, delay)
      Fades out an object with the id, objID from a maximum opacity of 
      maxOpacity down to 0 over an interval of fadeTime seconds with a 
      delay of delay seconds.
	
*/

function addEvent(object, evName, fnName, cap) {
   if (object.attachEvent)
       object.attachEvent("on" + evName, fnName);
   else if (object.addEventListener)
       object.addEventListener(evName, fnName, cap);
}

addEvent(window, "load", setupSlideshow, false);

function setupSlideshow() {

   var slides = new Array();

   // populate array of slide images
   for (var i = 0; i < document.images.length; i++) {
	var thumb = document.images[i];
	
         if (thumb.className == "slide" && thumb.parentNode.tagName == "A") {
	slides.push(thumb);
      }

     }

    for (var i = 0; i < slides.length; i++) {

     // Create a rollover for each slide
       createRollover(slides[i]);
      

     // Attach a high-resolution image object to each slide
	createHighRes(slides[i], i);
	}
    if (slides.length > 0) {
	createGallery(slides);
        createOverlay();
    }

}


function createHighRes(thumb, index) {

   thumb.big = new Image();
   thumb.big.src = thumb.src.replace(/_thumb/, "");

  //Display high-resolution image in slide gallery
   thumb.onclick = showGallery;

  // Set the index of the slide
  thumb.big.index = index;
   
}

function createRollover(thumb) {

  thumb.out = new Image();
  thumb.over = new Image();

  thumb.out.src = thumb.src;
  thumb.over.src = thumb.src.replace(/_thumb/, "_over");

  thumb.onmouseout = function() {
	thumb.src = thumb.out.src;
   }
  thumb.onmouseover = function() {
        thumb.src = thumb.over.src;
   }
}


function createGallery(slides) {

   var galleryBox = document.createElement("div");
   galleryBox.id = "galleryBox";

   // Insert a button to close the gallery
    var galleryTitle = document.createElement("p");
    galleryTitle.id = "galleryTitle";

   var closeButton = document.createElement("input");
   closeButton.type = "image";
   closeButton.src = "galleryclose.png";
   closeButton.onclick = function() {
	fadeOut("galleryBox", 100, 0.5, 0);
	fadeOut("pageOverlay", 80, 0.5, 0);
	setTimeout(function() {
	galleryBox.style.display = "none";
	document.getElementById("pageOverlay").style.display = "none";
	}, 500);
     }

   galleryTitle.appendChild(closeButton);
   galleryBox.appendChild(galleryTitle);

   // Insert a high-resolution slide
   var slide = document.createElement("img");
   slide.id = "gallerySlide";
   slide.src = slides[0].big.src;
   slide.index = 0;
   galleryBox.appendChild(slide);

   // Insert the slide caption
    var slideCaption = document.createElement("p");
    slideCaption.id = "slideCaption";
    slideCaption.innerHTML = slides[0].alt;
    galleryBox.appendChild(slideCaption);

   // Create the gallery footer
   var galleryFooter = document.createElement("p");
   galleryFooter.id = "galleryFooter";

   // Create a button to go to the previous slide
   var slideBack = document.createElement("input");
   slideBack.type = "image";
   slideBack.src = "back.png";
   slideBack.onclick = function () {
     
     // Get the index of current slide
     var currentSlide = document.getElementById("gallerySlide");
     var currentIndex = currentSlide.index;

     // Decrease the index by 1
     currentIndex--;

    // If currentSlide is the first slide, go to the end
     if (currentIndex == -1) currentIndex = slides.length - 1;

    // Change the image in the gallery
    changeSlide(slides[currentIndex]); 
           } 

   galleryFooter.appendChild(slideBack);


  // Show the initial slide number
   var slideNum = document.createElement("span");
   slideNum.id = "slideNumber";
   slideNum.innerHTML = "1";

   // Show the total number of slides
   var slideTotal = document.createTextNode(" of " + slides.length);

   galleryFooter.appendChild(slideNum);
   galleryFooter.appendChild(slideTotal);

   // Create a button to go to the next slide
   var slideForward = document.createElement("input");
   slideForward.type = "image";
   slideForward.src = "forward.png";
   slideForward.onclick = function () {

    // Get the index of current slide
    var currentSlide = document.getElementById("gallerySlide");
    var currentIndex = currentSlide.index;

   // Increase the index by 1
    currentIndex++;

   // If currentSlide is the last slide, go to the start
    if (currentIndex == slides.length) currentIndex = 0;

   // Change the image in the gallery
   changeSlide(slides[currentIndex]);
            }

   galleryFooter.appendChild(slideForward);

   galleryBox.appendChild(galleryFooter);

   document.body.appendChild(galleryBox);

}

function showGallery() {

   // Change the image based on the clicked thumbnail
   changeSlide(this);

   // Reveal the slide show
   setOpacity("galleryBox", 0);
   setOpacity("pageOverlay", 0);
   document.getElementById("galleryBox").style.display = "block";
   document.getElementById("pageOverlay").style.display = "block";
   fadeIn("galleryBox", 100, 0.5, 0);
   fadeIn("pageOverlay", 80, 0.5, 0);

   // Halt propagation of the click event
   return false;
}


function changeSlide (slide) {

   // Set object references
   var galleryBox = document.getElementById("galleryBox");
   var oldSlide = document.getElementById("gallerySlide");
   var slideCaption = document.getElementById("slideCaption");
   var slideNum = document.getElementById("slideNumber");

   // Replace current slide with new slide
   setOpacity("gallerySlide", 0);
   var newSlide = oldSlide.cloneNode(true);
   newSlide.src = slide.big.src;
   newSlide.index = slide.big.index;
   galleryBox.replaceChild(newSlide, oldSlide);
   fadeIn("gallerySlide", 100, 0.5, 0);

   // Replace current caption with new caption
   slideCaption.innerHTML = slide.alt;

   // Update the slide number
   slideNum.innerHTML = newSlide.index + 1;

}


function createOverlay() {
  // Create an overlay to obscure the view of the Web page 
   var pageOverlay = document.createElement("div");
   pageOverlay.id = "pageOverlay";

  document.body.appendChild(pageOverlay);

}




function setOpacity(objID, value) {
     var object = document.getElementById(objID);
     // Apply the opacity value for IE and non-IE browsers
     object.style.filter = "alpha(opacity = " + value + ")";
     object.style.opacity = value/100;
}

function fadeIn(objID, maxOpacity, fadeTime, delay) {
   // Calculate the interval between opacity changes
   var fadeInt = Math.round(fadeTime*1000)/maxOpacity;
   // Loop up the range of opacity values
   for (var i = 0; i <= maxOpacity; i++) {
     setTimeout("setOpacity('" + objID + "', " + i + ")", delay);
     delay += fadeInt;
   }
}

function fadeOut(objID, maxOpacity, fadeTime, delay) {
   // Calculate the interval between opacity changes
   var fadeInt = Math.round(fadeTime*1000)/maxOpacity;
   //Loop down the range of opacity values
   for (var i = maxOpacity; i >= 0; i--) {
     setTimeout("setOpacity('" + objID + "', " + i + ")", delay);
     delay += fadeInt;
   }
}