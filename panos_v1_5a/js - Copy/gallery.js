fetch("data/panos.json")
.then(r=>r.json())
.then(data=>{
 const gallery=document.getElementById("gallery");
 const groups={};
 for(const [id,p] of Object.entries(data)){
   if(!groups[p.location]) groups[p.location]={region:p.region,items:[]};
   groups[p.location].items.push({id,title:p.title});
 }
 Object.keys(groups).sort().forEach(loc=>{
   const h=document.createElement("h2");
   h.className="location";
   h.textContent=loc;
   gallery.appendChild(h);

   const r=document.createElement("div");
   r.className="region";
   r.textContent=groups[loc].region;
   gallery.appendChild(r);

   groups[loc].items.sort((a,b)=>a.title.localeCompare(b.title));
   groups[loc].items.forEach(item=>{
      const a=document.createElement("a");
      a.className="pano";
      a.href="viewer.html?p="+encodeURIComponent(item.id);
      a.textContent="📷 "+item.title;
      gallery.appendChild(a);
   });
 });
})
.catch(err=>{
 document.getElementById("gallery").textContent="Unable to load panorama catalog.";
 console.error(err);
});
