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