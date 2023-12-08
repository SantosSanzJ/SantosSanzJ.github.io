var words = [
    "Hi i like HTML",
    "I also like css",
    "Lorem ipsum dolor sit amet",
    " consectetur adipiscing elit",
    "sed do eiusmod tempor incididunt",
  ],
  part,
  i = 0,
  offset = 0,
  len = words.length,
  forwards = true,
  skip_count = 0,
  skip_delay = 15,
  speed = 70;
var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    } else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      } else {
        offset--;
      }
    }
    $(".word").text(part);
  }, speed);
};

function updateTextOnPathChange() {
  var listItems = document.querySelectorAll("ol:not(.icons) li");
  var initialTextContent = {};

  listItems.forEach(function (li) {
    // Store the initial text content for each link
    var link = li.querySelector("a");
    if (link.textContent === null){
        link.textContent = "#inicio"
    }else{
        initialTextContent[link.getAttribute("href")] = link.textContent;
    }
    li.addEventListener("click", function () {
      // Get the previous selected element
      var previousSelected = document.querySelector(".is-selected");
      if (previousSelected) {
        var previousPath = previousSelected
          .querySelector("a")
          .getAttribute("href");
        // Set the text content to the initial text for the previous path
        previousSelected.querySelector("a").textContent =
          initialTextContent[previousPath];
      }

      // Set the text content to "|" for the current path
      li.querySelector("a").textContent = "|";

      // Add or remove the "is-selected" class based on the current path
      listItems.forEach(function (item) {
        item.classList.remove("is-selected");
      });
      li.classList.add("is-selected");
    });
  });
}

function changeOpacityTo1(element) {
  element.style.opacity = 1;
  element.style.display = "block"; // Show the element if it's hidden
}

function changeOpacityTo0(element) {
  element.style.opacity = 0;
  element.style.display = "none"; // Hide the element
}
var previousHash = "";
function handleHashChange() {
  var previousElement = document.getElementById(previousHash);

  if (previousElement) {
    //o5window.alert(previousElement.id)
    changeOpacityTo0(previousElement);
  }

  var currentHash = window.location.hash.substring(1);
  var currentElement = document.getElementById(currentHash);
  previousHash = window.location.hash.substring(1);
  if (currentElement) {
    changeOpacityTo1(currentElement);
  }
}
function setup(){
  createCanvas(windowWidth, windowHeight);
}
function draw(){
  background(150);
  noStroke();
  for(let i = 0; i<14000; i++){
    rect(random(width), random(height), 2, 2);
  }
}

// Call the function on initial page load
window.onload = function () {
  handleHashChange();
  updateTextOnPathChange();
};
// Attach the event listener to the hashchange event
window.addEventListener("hashchange", handleHashChange);
$(document).ready(function () {
  wordflick();
});
setup()
draw()

