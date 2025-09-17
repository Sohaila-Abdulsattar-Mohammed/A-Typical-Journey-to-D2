//for all the lightbox functionality//

//grabbing key DOM elements for the lightbox
const overlay = document.getElementById("lightbox"); //the full-screen overlay element
const imgEl = overlay.querySelector("img"); //the image inside the lightbox
const capEl = overlay.querySelector("figcaption"); //the caption text inside the lightbox
const closeBtn = overlay.querySelector(".lb-close"); //the "X" close button

//helper function to extract the caption for a clicked image
function findCaptionFor(img) {
  const fig = img.closest("figure"); //look for the nearest <figure> container
  if (fig) {
    //use the text in <figcaption> inside the figure
    const firstFigcap = fig.querySelector("figcaption");
    if (firstFigcap && firstFigcap.textContent.trim())
      return firstFigcap.textContent.trim();
  }
  //fallback, if no captions found, use the <img>'s alt text
  return img.getAttribute("alt") || "";
}

//opening the lightbox
function openLightbox(src, alt, caption) {
  imgEl.src = src; //set the image source
  imgEl.alt = alt || ""; //set the alt text (fallback to empty if not provided)
  capEl.textContent = caption || ""; //set the caption text (fallback to empty)
  overlay.classList.add("open"); //add the "open" class to the list to show the overlay
}

//closing the lightbox
function closeLightbox() {
  overlay.classList.remove("open"); //removing the open class to hide the overlay
}

//click listener to open lightbox on relevant images
document.addEventListener("click", (e) => {
  // Look for clicks on:
  //- figure.screenshot (home page screenshots)
  //- figure.headshot (credits page headshots)
  //- figure.counter (about-us page counters)
  const card = e.target.closest(
    "figure.screenshot, figure.headshot, figure.counter"
  );
  const img = card.querySelector("img"); //find the image inside the container
  if (!img) return; //if no image found, do nothing
  e.preventDefault(); //prevent default click behaviors (just in case)
  openLightbox(img.src, img.alt, findCaptionFor(img)); //call the open lightbox function to open with image + caption
});

//clicking the "X" button calls the close function
closeBtn.addEventListener("click", closeLightbox);

//clicking outside the content area (on the dimmed background) calls the close function
overlay.addEventListener("click", (e) => {
  const clickedInsideContent = e.target.closest(".lb-content");
  const clickedCloseButton = e.target.closest(".lb-close");
  if (!clickedInsideContent && !clickedCloseButton) {
    closeLightbox();
  }
});

//pressing the escape key calls the close function
document.addEventListener("keydown", (e) => {
  if (!overlay.classList.contains("open")) return; //only if overlay is active
  if (e.key === "Escape") closeLightbox();
});
