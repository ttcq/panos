const params = new URLSearchParams(location.search);
const mediaId = params.get("p");

let infoVisible = false;

const el = {
  videoContainer: document.getElementById("videoContainer"),
  infoButton: document.getElementById("infoButton"),
  infoPanel: document.getElementById("infoPanel"),
  videoTitle: document.getElementById("videoTitle"),
  videoLocation: document.getElementById("videoLocation"),
  videoRegion: document.getElementById("videoRegion"),
  videoCamera: document.getElementById("videoCamera")
};

// Provider registry. Each provider knows how to turn a media item
// into an embeddable iframe URL. Add "local", "vimeo", etc. here later.
const videoProviders = {
  youtube: video => `https://www.youtube.com/embed/${video.youtubeId}`
};

function buildVideoEmbedUrl(video) {
  const provider = video.provider || "youtube";
  const build = videoProviders[provider];
  return build ? build(video) : null;
}

function toggleInfo() {
  infoVisible = !infoVisible;
  el.infoPanel.classList.toggle("visible", infoVisible);
}

function showNotFound() {
  document.title = "Video not found.";
  el.videoContainer.textContent = "";
  const message = document.createElement("div");
  message.className = "notFound";
  message.textContent = "Video not found.";
  el.videoContainer.appendChild(message);
  el.infoPanel.classList.remove("visible");
}

function createPlayer(video) {
  const embedUrl = buildVideoEmbedUrl(video);
  if (!embedUrl) {
    showNotFound();
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = embedUrl;
  iframe.title = video.title;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;

  el.videoContainer.appendChild(iframe);
}

MediaStore.load().then(() => {
  const video = MediaStore.get(mediaId);
  if (!video || video.type !== "video") {
    showNotFound();
    return;
  }

  document.title = video.title;
  el.videoTitle.textContent = video.title;
  el.videoLocation.textContent = "📍 " + video.location.name;
  el.videoRegion.textContent = video.location.region;

  if (video.camera) {
    el.videoCamera.textContent = "📷 " + video.camera;
    el.videoCamera.classList.remove("hidden");
  } else {
    el.videoCamera.classList.add("hidden");
  }

  createPlayer(video);
}).catch(e => {
  console.error(e);
  showNotFound();
});

el.infoButton.addEventListener("click", toggleInfo);
