const baseURL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&format=json`;

const $ = document.querySelector.bind(document);

const getImages = async (text) => {
  try {
    console.log("Retrieving images...");
    url = `${baseURL}&text=${text}`;
  } catch (err) {
    console.log(err);
  }
};

getImages();

console.log($("#search-btn"));

$("#search-btn").addEventListener("click", () => {
  let text = $("#search-input").value;
  console.log(`Searching for ${text}...`);
});
