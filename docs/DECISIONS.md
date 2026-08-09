Decision #1

Albums replace individual photos on the home page.

Reason

Reduces clutter.
Scales better.
Improves phone usability.

Decision #2

media.json replaces panos.json.

Reason

The application now supports multiple media types.

Media is organized by location.

Explore models the real world. Locations own their media. Media does not exist independently.

Every runtime component reads from a single source of truth (media.json). Legacy data files are transitional and should be removed once migration is complete.

### Album Viewer Panzoom

Panzoom is initialized with:

    canvas: true

Reason:

Album photos are letterboxed within a full-screen container.

Without `canvas: true`, Panzoom only receives pointer events that begin on the `<img>` element.

On mobile devices, pinch gestures frequently begin with one finger in the surrounding letterboxed area.

Using `canvas: true` causes Panzoom to attach pointer listeners to the full viewport container, allowing pinch gestures to begin anywhere within the viewer.

This is required for reliable mobile pinch-to-zoom.
------
