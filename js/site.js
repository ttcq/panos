//====================================================
// Panos Viewer
// Version 1.2
//====================================================

//----------------------------------------------------
// Read requested panorama
//----------------------------------------------------

const params = new URLSearchParams(window.location.search);

let panoName = params.get("p");

if (!panoName) {
    panoName = "campLight01";
}

//----------------------------------------------------
// Global Variables
//----------------------------------------------------

let viewer;
let infoVisible = false;

document
    .getElementById("motionButton")
    .classList.add("inactive");

//----------------------------------------------------
// Toggle Information Panel
//----------------------------------------------------

function toggleInfoPanel() {

    const panel = document.getElementById("infoPanel");

    infoVisible = !infoVisible;

    if (infoVisible) {
        panel.classList.add("visible");
    } else {
        panel.classList.remove("visible");
    }

}

//----------------------------------------------------
// Load Panorama Catalog
//----------------------------------------------------

fetch("data/panos.json")

    .then(response => response.json())

    .then(catalog => {

        const pano = catalog[panoName];

        if (!pano) {

            alert("Unknown panorama: " + panoName);

            return;

        }

        //------------------------------------------------
        // Browser Title
        //------------------------------------------------

        document.title = pano.title;

        //------------------------------------------------
        // Welcome Screen
        //------------------------------------------------

        document.getElementById("welcomeTitle").textContent =
            pano.title;

        document.getElementById("welcomeLocation").textContent =
            "📍 " + pano.location;

        document.getElementById("welcomeRegion").textContent =
            pano.region;

        document.getElementById("welcomeCamera").textContent =
            "📷 " + pano.camera;

        //------------------------------------------------
        // Information Panel
        //------------------------------------------------

        document.getElementById("panoTitle").textContent =
            pano.title;

        document.getElementById("panoLocation").textContent =
            "📍 " + pano.location;

        document.getElementById("panoRegion").textContent =
            pano.region;

        document.getElementById("panoCamera").textContent =
            "📷 " + pano.camera;

        //------------------------------------------------
        // Create Viewer
        //------------------------------------------------

        viewer = pannellum.viewer("panorama", {

            type: "equirectangular",

            panorama: pano.image,

            autoLoad: true,

            compass: true,

            showZoomCtrl: true,

            showFullscreenCtrl: true,

            hfov: pano.hfov,

            pitch: pano.pitch,

            yaw: pano.yaw

        });

    })

    .catch(error => {

        console.error(error);

        alert("Unable to load panos.json");

    });

//----------------------------------------------------
// Start Exploring
//----------------------------------------------------

document
    .getElementById("startButton")
    .addEventListener("click", () => {

        document
            .getElementById("welcomeOverlay")
            .classList.add("hidden");

    });

//----------------------------------------------------
// Information Button
//----------------------------------------------------

document
    .getElementById("infoButton")
    .addEventListener("click", () => {

        toggleInfoPanel();

    });