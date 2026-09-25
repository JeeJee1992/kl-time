const CACHE='kl-time-fast-pwa-v5-2';
const SHELL=[
  './fast.html',
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
      keys.filter(k=>k.startsWith('kl-time-fast-pwa-')&&k!==CACHE)
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

  // fast.html: network-first so updates reach the kiosk quickly.
  if(url.pathname.endsWith('/fast.html') || url.pathname.endsWith('/kl-time/')){
    event.respondWith(
      fetch(req)
        .then(res=>{
          const copy=res.clone();
          caches.open(CACHE).then(c=>c.put('./fast.html',copy)).catch(()=>{});
          return res;
        })
        .catch(()=>caches.match('./fast.html'))
    );
    return;
  }

  // PWA shell assets: cache-first.
  if(
    url.pathname.endsWith('/manifest.webmanifest') ||
    /\/icon-(180|192|512)\.png$/.test(url.pathname)
  ){
    event.respondWith(
      caches.match(req).then(hit=>hit||fetch(req))
    );
  }
});
