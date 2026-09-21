const CACHE='kl-time-hr-full-v3-2-late-deduction';
const FACE_CACHE='kl-time-face-assets-v1';
const ASSETS=['./','./index.html','./fast.html','./config.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&k!==FACE_CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.hostname==='cdn.jsdelivr.net'){
    e.respondWith(caches.open(FACE_CACHE).then(async c=>{const hit=await c.match(e.request);if(hit)return hit;try{const r=await fetch(e.request);if(r&&(r.ok||r.type==='opaque'))await c.put(e.request,r.clone());return r}catch(err){return hit||Response.error()}}));
    return;
  }
  if(u.origin!==self.location.origin)return;
  e.respondWith(caches.match(e.request).then(cached=>{
    const fresh=fetch(e.request).then(r=>{if(r&&r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>null);
    return cached||fresh.then(r=>r||caches.match('./index.html'));
  }));
});
