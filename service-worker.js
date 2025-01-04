const CACHE_NAME = 'breakout-game-cache-v1';
const ASSETS = [
    './index.html',
    './styles/styles.css',
    './assets/images/tiles/tileSlimGreen0.png',
    './assets/images/tiles/tileSlimGreen1.png',
    './assets/images/tiles/tileSlimGreen2.png',
    './assets/images/ui/android-chrome-192x192.png',
    './assets/images/ui/android-chrome-512x512.png',
    './assets/sounds/boom3.wav',
    './levels.json'
];

// Install event: Caching assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching assets');
            return cache.addAll(ASSETS);
        })
    );
});

// Activate event: Cleaning up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event: Serve cached assets
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
