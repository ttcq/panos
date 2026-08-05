//====================================================
// Panos Viewer
// Version 1.4
//====================================================

const APP_VERSION="1.4";
const params=new URLSearchParams(location.search);
const panoName=params.get("p")||"campLight01";

let viewer=null;
let motionEnabled=false;
let infoVisible=false;

const el={
 welcomeOverlay:document.getElementById("welcomeOverlay"),
 welcomeTitle:document.getElementById("welcomeTitle"),
 welcomeLocation:document.getElementById("welcomeLocation"),
 welcomeRegion:document.getElementById("welcomeRegion"),
 welcomeCamera:document.getElementById("welcomeCamera"),
 startButton:document.getElementById("startButton"),
 motionButton:document.getElementById("motionButton"),
 infoButton:document.getElementById("infoButton"),
 infoPanel:document.getElementById("infoPanel"),
 panoTitle:document.getElementById("panoTitle"),
 panoLocation:document.getElementById("panoLocation"),
 panoRegion:document.getElementById("panoRegion"),
 panoCamera:document.getElementById("panoCamera")
};

function setMotionState(state){
 el.motionButton.classList.remove("inactive","active","error");
 el.motionButton.classList.add(state);
}

function toggleInfo(){
 infoVisible=!infoVisible;
 el.infoPanel.classList.toggle("visible",infoVisible);
}

async function toggleMotion(){
 if(!viewer)return;
 if(!viewer.isOrientationSupported||!viewer.isOrientationSupported()){
   setMotionState("error");
   return;
 }
 if(motionEnabled){
   viewer.stopOrientation();
   motionEnabled=false;
   setMotionState("inactive");
   return;
 }
 try{
   viewer.startOrientation();
   motionEnabled=true;
   setMotionState("active");
 }catch(e){
   console.error(e);
   setMotionState("error");
 }
}

fetch("data/panos.json")
.then(r=>r.json())
.then(catalog=>{
 const p=catalog[panoName];
 if(!p){alert("Unknown panorama");return;}
 document.title=p.title;
 el.welcomeTitle.textContent=p.title;
 el.welcomeLocation.textContent="📍 "+p.location;
 el.welcomeRegion.textContent=p.region;
 el.welcomeCamera.textContent="📷 "+p.camera;
 el.panoTitle.textContent=p.title;
 el.panoLocation.textContent="📍 "+p.location;
 el.panoRegion.textContent=p.region;
 el.panoCamera.textContent="📷 "+p.camera;

 viewer=pannellum.viewer("panorama",{
   type:"equirectangular",
   panorama:p.image,
   autoLoad:true,
   compass:true,
   showZoomCtrl:true,
   showFullscreenCtrl:true,
   hfov:p.hfov,
   pitch:p.pitch,
   yaw:p.yaw
 });

 setMotionState("inactive");
});

el.startButton.addEventListener("click",async()=>{
 el.welcomeOverlay.classList.add("hidden");
 await toggleMotion();
});

el.motionButton.addEventListener("click",toggleMotion);
el.infoButton.addEventListener("click",toggleInfo);
