const $ = document.querySelector.bind(document);

//Image search function
const getImages = async (text) => {
  try {
    //if no text given, set default search to 'dog'
    text = text ? text : "dog";
    let response = await fetch(`/api/search?text=${text}`);
    let data = await response.json();
    let photos = data.photos;
    populateImages(photos);
  } catch (err) {
    popupSwitch();
    console.warn(err);
  }
};

//Takes in an array of images from Flickr, creates img elements for each photo in array.
const populateImages = (imageArray) => {
  try {
    const imgURL = "https://live.staticflickr.com/";
    imageArray.forEach((photo) => {
      let img = document.createElement("img");
      let url = `${imgURL}${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
      img.setAttribute("src", url);
      img.setAttribute("alt", photo.title ? photo.title : "Search result");
      img.setAttribute("title", photo.title ? photo.title : "Search result");
      img.classList.add("flickr-img");
      $("#image-gallery-wrapper").append(img);
    });
  } catch (err) {
    popupSwitch();
    console.warn(err);
  }
};

//Handles search events, clears gallery and text input.
const searchHandler = () => {
  let text = $("#search-input").value;
  getImages(text);
  $("#search-input").value = "";
  $("#image-gallery-wrapper").innerHTML = "";
};

//Contains error popup entrance/exit animation.
const popupSwitch = () => {
  let popup = $(".error-popup");
  if (popup.classList.contains("ease_in")) {
    popup.classList.remove("ease_in");
    popup.classList.add("ease_out");
  } else if (popup.classList.contains("ease_out")) {
    popup.classList.remove("ease_out");
    popup.classList.add("ease_in");
  } else {
    popup.classList.add("ease_in");
  }
};

//When search button clicked or enter pressed in search input, trigger API get request.
$("#search-btn").addEventListener("click", searchHandler);

$("#search-input").addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    searchHandler();
  }
});

$("#popup-btn").addEventListener("click", popupSwitch);
