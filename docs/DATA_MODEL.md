Location (keyed by slug, e.g. "horseshoeLake")

    name
    region
    description
    coverImage

    items

        Panorama
            id
            type
            title
            order
            image
            camera
            author
            hfov
            pitch
            yaw

        Album
            id
            type
            title
            order
            camera
            author
            photos
                id
                title
                image

        Video
            id
            type
            title
            order
            youtubeId

Composite IDs

    Not stored in media.json.
    Built once per page by mediaStore.js.

    location.item
    location.item.photo

    Examples
        horseshoeLake.panorama
        horseshoeLake.familyCampers
        horseshoeLake.familyCampers.0220
        campHighSierra.campLanternA