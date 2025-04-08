const CACHE_NAME = 'quizy-cache-v1';
const urlsToCache = [
  '/', // Main entry point
  '/manifest.json',
  '/favicon.ico',
  '/assets/questions.json',
  '/assets/categories.json',
  '/assets/fifty.svg',
  '/assets/sound-off.svg',
  '/assets/sound-on.svg',
  '/assets/star.svg',
  '/assets/trophy.svg',
  '/sounds/wrong_answer.mp3',
  '/sounds/correct_answer.mp3',
  '/sounds/pop-down.mp3',
  '/sounds/pop-up-off.mp3',
  '/sounds/pop-up-on.mp3',
  '/sounds/pop.mp3',
  '/sounds/switch-off.mp3',
  '/sounds/switch-on.mp3',
  '/sounds/win.mp3',
  '/icons/quizy480.ico',
  '/icons/quizy512.ico',
  '/icons/quizy480.png',
  '/icons/quizy192.png',
  '/icons/quizy144.png',
  '/letters/letter-a.svg',
  '/letters/letter-b.svg',
  '/letters/letter-c.svg',
  '/letters/letter-d.svg',
  '/bg-gamemodes.svg',
  '/bg-home.png',
  '/bg-home.svg',
  '/bg.jpg',
];

// Install the service worker and cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching files...');
      return cache.addAll(urlsToCache).catch((error) => {
        console.error('Failed to cache:', error);
        urlsToCache.forEach(async (url) => {
          try {
            await cache.add(url);
          } catch (err) {
            console.error(`Failed to cache ${url}:`, err);
          }
        });
      });
    })
  );
});

// Fetch assets from the cache or network
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('Service Worker: Serving from cache:', event.request.url);
        return response;
      }
      console.log('Service Worker: Fetching from network:', event.request.url);
      return fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch((error) => {
          console.error('Service Worker: Fetch failed:', error);
          throw error;
        });
    })
  );
});

// Update the service worker and clear old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});