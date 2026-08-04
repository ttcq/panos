// ====================================================
// Panorama Viewer
// Version 1.1
// ====================================================

//------------------------------------------------------
// Read requested panorama
//------------------------------------------------------

const params = new URLSearchParams(window.location.search);

let panoName = params.get("p");

if (!panoName) {
    panoName = "campLight01";
}

//------------------------------------------------------
// Variables
//------------------------------------------------------

let infoTimer = null;

//------------------------------------------------------
// Show the information panel for 5 seconds
//------------------------------------------------------

function showInfoPanel() {

    const panel = document.getElementById("infoPanel");
    const button = document.getElementById("infoButton");

    panel.classList.remove("fadeOut");

    button.style.display = "none";

    clearTimeout(infoTimer);

    infoTimer = setTimeout(() => {

        panel.classList.add("fadeOut");

        button.style.display = "block";

    }, 5000);

}

//------------------------------------------------------
// Load panorama catalog
//------------------------------------------------------

fetch("data/panos.json")

    .then(response => response.json())

    .then(catalog => {

        const pano = catalog[panoName];

        if (!pano) {

            alert("Unknown panorama: " + panoName);

            return;

        }

        //--------------------------------------------------
        // Browser title
        //--------------------------------------------------

        document.title = pano.title;

        //--------------------------------------------------
        // Information panel
        //--------------------------------------------------

        document.getElementById("panoTitle").textContent =
            pano.title;

        document.getElementById("panoLocation").textContent =
            "📍 " + pano.location;

        document.getElementById("panoRegion").textContent =
            pano.region;

        document.getElementById("panoCamera").textContent =
            "📷 " + pano.camera;

        //--------------------------------------------------
        // Welcome screen
        //--------------------------------------------------

        document.getElementById("welcomeTitle").textContent =
            pano.title;

        document.getElementById("welcomeLocation").textContent =
            "📍 " + pano.location;

        document.getElementById("welcomeRegion").textContent =
            pano.region;

        document.getElementById("welcomeCamera").textContent =
            "📷 " + pano.camera;

        //--------------------------------------------------
        // Create panorama viewer
        //--------------------------------------------------

        pannellum.viewer("panorama", {

            type: "equirectangular",

            panorama: pano.image,

            autoLoad: true,

            showZoomCtrl: true,

            showFullscreenCtrl: true,

            compass: true,

            hfov: pano.hfov,

            pitch: pano.pitch,

            yaw: pano.yaw

        });

    })

    .catch(error => {

        console.error(error);

        alert("Unable to load panos.json");

    });

//------------------------------------------------------
// Start Exploring
//------------------------------------------------------

document
    .getElementById("startButton")
    .addEventListener("click", () => {

        const overlay =
            document.getElementById("welcomeOverlay");

        overlay.classList.add("hidden");

        showInfoPanel();

    });

//------------------------------------------------------
// Information button
//------------------------------------------------------

document
    .getElementById("infoButton")
    .addEventListener("click", () => {

        showInfoPanel();

    });