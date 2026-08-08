//====================================================
// Panos Photo Viewer
//====================================================

const params=new URLSearchParams(location.search);
const mediaName=params.get("m")||"HorseshoeLake";

let infoVisible=false;

const el={
 photoImage:document.getElementById("photoImage"),
 welcomeOverlay:document.getElementById("welcomeOverlay"),
 welcomeTitle:document.getElementById("welcomeTitle"),
 welcomeLocation:document.getElementById("welcomeLocation"),
 welcomeRegion:document.getElementById("welcomeRegion"),
 welcomeCamera:document.getElementById("welcomeCamera"),
 startButton:document.getElementById("startButton"),
 infoButton:document.getElementById("infoButton"),
 infoPanel:document.getElementById("infoPanel"),
 panoTitle:document.getElementById("panoTitle"),
 panoLocation:document.getElementById("panoLocation"),
 panoRegion:document.getElementById("panoRegion"),
 panoCamera:document.getElementById("panoCamera")
};

function toggleInfo(){
 infoVisible=!infoVisible;
 el.infoPanel.classList.toggle("visible",infoVisible);
}

function showMedia(p){
 document.title=p.title;
 el.photoImage.src=p.image;
 el.photoImage.alt=p.title;
 el.welcomeTitle.textContent=p.title;
 el.welcomeLocation.textContent="Location: "+p.location;
 el.welcomeRegion.textContent=p.region;
 el.welcomeCamera.textContent="Camera: "+p.camera;
 el.panoTitle.textContent=p.title;
 el.panoLocation.textContent="Location: "+p.location;
 el.panoRegion.textContent=p.region;
 el.panoCamera.textContent="Camera: "+p.camera;
}

fetch("data/panos.json")
.then(r=>r.json())
.then(catalog=>{
 const p=catalog[mediaName];
 if(!p){alert("Unknown photo");return;}
 showMedia(p);
});

el.startButton.addEventListener("click",()=>{
 el.welcomeOverlay.classList.add("hidden");
});

el.infoButton.addEventListener("click",toggleInfo);
