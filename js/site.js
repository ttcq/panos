// Read the URL parameter "p"
const params = new URLSearchParams(window.location.search);

let pano = params.get("p");

// Default panorama
if (!pano) {
    pano = "campLight01";
}

pannellum.viewer("panorama", {

    type: "equirectangular",

    panorama: `images/${pano}.jpg`,

    autoLoad: true,

    showZoomCtrl: true,

    showFullscreenCtrl: true,

    compass: true

});