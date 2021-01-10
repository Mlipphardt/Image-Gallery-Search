const $ = document.querySelector.bind(document);

//Image search function
const getImages = async (text) => {
  try {
    text = text ? text : "cat";
    let response = await fetch(`/api/search?text=${text}`);
    let data = await response.json();
    let photos = data.photos;
    populateImages(photos);
  } catch (err) {
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
    console.warn(err);
  }
};

//When search button clicked, trigger API get request.
$("#search-btn").addEventListener("click", () => {
  let text = $("#search-input").value;
  getImages(text);
  $("#search-input").value = "";
  $("#image-gallery-wrapper").innerHTML = "";
});
