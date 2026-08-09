const params = new URLSearchParams(location.search);
const albumId = params.get("p");

let photos = [];
let idx = 0;
let pz;
let infoVisible = false;

const el = {
  image: document.getElementById("photoImage"),
  prevButton: document.getElementById("prevButton"),
  nextButton: document.getElementById("nextButton"),
  infoButton: document.getElementById("infoButton"),
  infoPanel: document.getElementById("infoPanel"),
  albumTitle: document.getElementById("albumTitle"),
  albumLocation: document.getElementById("albumLocation"),
  albumRegion: document.getElementById("albumRegion"),
  albumCamera: document.getElementById("albumCamera"),
  photoTitle: document.getElementById("photoTitle"),
  photoCount: document.getElementById("photoCount")
};

function toggleInfo() {
  infoVisible = !infoVisible;
  el.infoPanel.classList.toggle("visible", infoVisible);
  document.body.classList.toggle("info-open", infoVisible);
}

function show() {
  const photo = photos[idx];
  document.title = photo.title;
  el.photoTitle.textContent = photo.title;
  el.photoCount.textContent = `Photo ${idx + 1} of ${photos.length}`;
  el.prevButton.disabled = idx === 0;
  el.nextButton.disabled = idx === photos.length - 1;
  el.image.onload = () => pz.reset();
  el.image.src = photo.image;
}

MediaStore.load().then(() => {
  const album = MediaStore.get(albumId);
  if (!album || album.type !== "album") {
    alert("Unknown album");
    return;
  }

  photos = album.photos;
  document.title = album.title;
  el.albumTitle.textContent = album.title;
  el.albumLocation.textContent = "📍 " + album.location.name;
  el.albumRegion.textContent = album.location.region;
  el.albumCamera.textContent = "📷 " + album.camera;

  pz = Panzoom(el.image, { maxScale: 8, minScale: 1, canvas: true });
  el.image.parentElement.addEventListener("wheel", pz.zoomWithWheel);

  show();
}).catch(e => {
  console.error(e);
  alert("Unable to load media catalog.");
});

el.prevButton.addEventListener("click", () => {
  if (idx > 0) { idx--; show(); }
});

el.nextButton.addEventListener("click", () => {
  if (idx < photos.length - 1) { idx++; show(); }
});

el.infoButton.addEventListener("click", toggleInfo);
