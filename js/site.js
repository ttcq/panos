//====================================================
// Panos Viewer
// Version 2.0
//====================================================

const params = new URLSearchParams(location.search);
const panoId = params.get("p");

let viewer = null;
let motionEnabled = false;
let infoVisible = false;

const el = {
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

MediaStore.load().then(()=>{
 const p=MediaStore.get(panoId);
 if(!p||p.type!=="panorama"){alert("Unknown panorama");return;}

 document.title=p.title;
 el.welcomeTitle.textContent=p.title;
 el.welcomeLocation.textContent="📍 "+p.location.name;
 el.welcomeRegion.textContent=p.location.region;
 el.welcomeCamera.textContent="📷 "+p.camera;
 el.panoTitle.textContent=p.title;
 el.panoLocation.textContent="📍 "+p.location.name;
 el.panoRegion.textContent=p.location.region;
 el.panoCamera.textContent=p.camera;

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
}).catch(e=>{
 console.error(e);
 alert("Unable to load media catalog.");
});

el.startButton.addEventListener("click",async()=>{
 el.welcomeOverlay.classList.add("hidden");
 await toggleMotion();
});

el.motionButton.addEventListener("click",toggleMotion);
el.infoButton.addEventListener("click",toggleInfo);
