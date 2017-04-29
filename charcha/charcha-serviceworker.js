// offline support for charcha

var cacheName = 'charcha';
var filesToCache = [
'/',
'/static/main.css',
'/static/main.js',
'/static/pushpa.js',
'/manifest.json',
'/discuss/'.concat(getURLParameter(window.location.href)).concat('/'),
]
;
self.addEventListener('install', function(e) {
  console.log('ServiceWorker Installed');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Caching data');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('Activated service worker');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('clear old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('Fetch resources', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      console.log(response);
      return response || fetch(e.request);
    })
  );
});

function getURLParameter(url) {
  array = url.split('/');
  result = array[array.length - 2];
  return result;
}

