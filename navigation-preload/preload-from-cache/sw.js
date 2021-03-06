// Slow the serviceworker down a bit
const start = Date.now();
while (Date.now() - start < 300);

self.addEventListener('install', event => {
    console.log('V1 installing…');
  
    // cache a cat SVG
    event.waitUntil(
      caches.open('static-v1').then(cache => cache.add('/'))
    );
});

addEventListener('activate', event => {
  event.waitUntil(async function() {
    if (self.registration.navigationPreload) {

      // 启动 navigation preload
      await self.registration.navigationPreload.enable();
      console.log(await self.registration.navigationPreload.getState());
    }
  }());
});

addEventListener('fetch', event => {
  event.respondWith(async function() {
    // Respond from the cache if we can
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;

    // Use the preloaded response, if it's there
    const response = await event.preloadResponse;
    if (response) return response;
    
    // Else try the network.
    return fetch(event.request);
  }());
});