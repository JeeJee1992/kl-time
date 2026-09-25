const CACHE='kl-time-fast-isolated-v5-3';
const SHELL=[
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE).then(cache=>cache.addAll(SHELL)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k.startsWith('kl-time-fast-isolated-')&&k!==CACHE)
          .map(k=>caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;

  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;

  // Only this /fast/ app shell is controlled by this worker.
  if(
    url.pathname.endsWith('/kl-time/fast/') ||
    url.pathname.endsWith('/kl-time/fast/index.html')
  ){
    event.respondWith(
      fetch(req)
        .then(res=>{
          const copy=res.clone();
          caches.open(CACHE).then(c=>c.put('./index.html',copy)).catch(()=>{});
          return res;
        })
        .catch(()=>caches.match('./index.html'))
    );
    return;
  }

  if(
    url.pathname.endsWith('/kl-time/fast/manifest.webmanifest') ||
    /\/kl-time\/fast\/icon-(180|192|512)\.png$/.test(url.pathname)
  ){
    event.respondWith(caches.match(req).then(hit=>hit||fetch(req)));
  }
});
