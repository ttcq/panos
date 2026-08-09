//====================================================
// MediaStore
// Shared data layer for media.json
//====================================================

const MediaStore = (() => {
  let loadPromise = null;
  let resolved = null;

  function buildIndex(data) {
    const index = new Map();

    for (const [locationKey, location] of Object.entries(data.locations)) {
      for (const item of location.items) {
        const itemId = `${locationKey}.${item.id}`;
        index.set(itemId, { ...item, id: itemId, locationKey, location });

        if (item.type === "album" && Array.isArray(item.photos)) {
          for (const photo of item.photos) {
            const photoId = `${itemId}.${photo.id}`;
            index.set(photoId, {
              ...photo,
              id: photoId,
              type: "photo",
              locationKey,
              location,
              albumId: itemId,
              album: item
            });
          }
        }
      }
    }

    return index;
  }

  function load() {
    if (!loadPromise) {
      loadPromise = fetch("data/media.json")
        .then(r => r.json())
        .then(data => {
          resolved = { data, index: buildIndex(data) };
          return resolved;
        });
    }
    return loadPromise;
  }

  function get(id) {
    return resolved ? resolved.index.get(id) : undefined;
  }

  return { load, get };
})();
