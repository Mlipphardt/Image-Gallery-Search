const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 8080;

const API_KEY = process.env.API_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api/search", async (req, res) => {
  try {
    let text = req.query.text;
    const baseURL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&format=json&nojsoncallback=1&safe_search=1`;
    let url = `${baseURL}&text=${text}`;
    let response = await fetch(url);
    let data = await response.json();
    let photos =
      data.photos.photo.length > 20
        ? data.photos.photo.slice(0, 20)
        : data.photos.photo;
    return res.json({
      photos: photos,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err,
    });
  }
});

app.listen(PORT, function () {
  console.log("Server listening on " + PORT);
});
