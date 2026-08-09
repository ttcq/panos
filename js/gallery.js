MediaStore.load().then(({ data }) => {
  const g = document.getElementById("gallery");
  g.innerHTML = "";

  Object.entries(data.locations)
    .sort((a, b) => a[1].name.localeCompare(b[1].name))
    .forEach(([locationKey, loc]) => {
      const h = document.createElement("h2");
      h.className = "location";
      h.textContent = loc.name;
      g.appendChild(h);

      const rg = document.createElement("div");
      rg.className = "region";
      rg.textContent = loc.region;
      g.appendChild(rg);

      loc.items
        .sort((a, b) => a.order - b.order)
        .forEach(item => {
          const id = `${locationKey}.${item.id}`;
          const a = document.createElement("a");
          a.className = "media";

          if (item.type === "panorama") {
            a.href = "viewer.html?p=" + encodeURIComponent(id);
            a.textContent = "🌐 " + item.title;
          } else if (item.type === "album") {
            a.href = "album.html?p=" + encodeURIComponent(id);
            a.textContent = `📸 ${item.title} (${item.photos.length})`;
          } else if (item.type === "video") {
            a.href = "video.html?p=" + encodeURIComponent(id);
            a.textContent = "🎬 " + item.title;
          }

          g.appendChild(a);
        });
    });
}).catch(e => {
  document.getElementById("gallery").textContent = "Unable to load media catalog.";
  console.error(e);
});
