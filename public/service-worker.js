const cacheName = 'converter-sensei-cache-v1';
const filesToCache = [
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/robots.txt',
  '/style.css',
  '/webfonts/fa-solid-900.woff2',
  '/main.js',
  '/data.js',
  'menu-bar.css'
];


self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open('converter-sensei-cache-v1').then(function (cache) {
      return cache.match(event.request).then(function (response) {
        let fetchPromise = fetch(event.request).then(function (networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        if (response) console.log('found ' + response.url + ' in cache')
        return response || fetchPromise;
      })
    })
  );
});
