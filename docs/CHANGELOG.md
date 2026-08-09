Explore Changelog

Sprint 2.2A — Video Viewer

Added
    ✓ Video Viewer
        video.html, video.js, css/video.css
        Reads media through mediaStore.js only.
        Builds the YouTube iframe dynamically after load
        (not hardcoded in video.html).
        Provider lookup (videoProviders) isolates YouTube-specific
        embed logic so local/vimeo providers can be added later
        without touching viewer code.
        Displays "Video not found." on an invalid or non-video ID
        instead of throwing.

Sprint 2.1A — Media Architecture Migration

Added
    ✓ mediaStore.js
        Shared data layer. Loads media.json once per page,
        builds an in-memory index keyed by composite ID.
    ✓ Album Viewer
        album.html, album.js, album.css

Changed
    ✓ gallery.js
        Links use composite IDs (location.item) instead of raw
        media.json item ids.
    ✓ site.js
        Panorama viewer now reads media.json via mediaStore.js
        instead of data/panos.json.

Deprecated
    ✓ photo.html / photo.js
        Replaced by the Album Viewer. Left in the repository;
        scheduled for removal in Sprint 2.1B.
    ✓ data/panos.json
        No longer read by any active viewer. Left in the
        repository; scheduled for removal in Sprint 2.1B.
