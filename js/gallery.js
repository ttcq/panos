fetch("data/panos.json")
.then(r=>r.json())
.then(data=>{
 const gallery=document.getElementById("gallery");
 const groups={};
 Object.entries(data).forEach(([id,p])=>{
   const key=p.location;
   if(!groups[key]) groups[key]={region:p.region,items:[]};
   groups[key].items.push({id,title:p.title});
 });
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
});
