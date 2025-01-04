const CACHE_NAME = 'breakout-game-cache-v1';
const ASSETS = [
    './', // Root
    './index.html',
    './styles/styles.css',
    './scripts/main.js',
    './scripts/scenes/gameOver.js',
    './scripts/scenes/levelLoader.js',
    './scripts/scenes/pause.js',
    './scripts/scenes/play.js',
    './scripts/scenes/victory.js',
    './scripts/scenes/game.js',
    './phaser.min.js',
    './manifest.json',
    './favicon.png',
    // Fonts
    './assets/fonts/m6x11.ttf',
    // Images
    './assets/images/balls/ballYellow.png',
    './assets/images/balls/ballYellowBig.png',
    './assets/images/balls/ballYellowSmall.png',
    './assets/images/paddle/paddleRedt.png',
    './assets/images/tiles/tileSlimGray0.png',
    './assets/images/tiles/tileSlimGray1.png',
    './assets/images/tiles/tileSlimGray2.png',
    './assets/images/tiles/tileSlimGreen0.png',
    './assets/images/tiles/tileSlimGreen1.png',
    './assets/images/tiles/tileSlimGreen2.png',
    './assets/images/tiles/tileSlimOrange0.png',
    './assets/images/tiles/tileSlimOrange1.png',
    './assets/images/tiles/tileSlimOrange2.png',
    './assets/images/tiles/tileSlimPurple0.png',
    './assets/images/tiles/tileSlimPurple1.png',
    './assets/images/tiles/tileSlimPurple2.png',
    './assets/images/tiles/tileSlimRed0.png',
    './assets/images/tiles/tileSlimRed1.png',
    './assets/images/tiles/tileSlimRed2.png',
    './assets/images/tiles/tileSlimYellow0.png',
    './assets/images/tiles/tileSlimYellow1.png',
    './assets/images/tiles/tileSlimYellow2.png',
    './assets/images/tiles/tileThickGray0.png',
    './assets/images/tiles/tileThickGray1.png',
    './assets/images/tiles/tileThickGray2.png',
    './assets/images/tiles/tileThickGreen0.png',
    './assets/images/tiles/tileThickGreen1.png',
    './assets/images/tiles/tileThickGreen2.png',
    './assets/images/tiles/tileThickOrange0.png',
    './assets/images/tiles/tileThickOrange1.png',
    './assets/images/tiles/tileThickOrange2.png',
    './assets/images/tiles/tileThickPurple0.png',
    './assets/images/tiles/tileThickPurple1.png',
    './assets/images/tiles/tileThickPurple2.png',
    './assets/images/tiles/tileThickRed0.png',
    './assets/images/tiles/tileThickRed1.png',
    './assets/images/tiles/tileThickRed2.png',
    './assets/images/tiles/tileThickYellow0.png',
    './assets/images/tiles/tileThickYellow1.png',
    './assets/images/tiles/tileThickYellow2.png',
    './assets/images/ui/android-chrome-192x192.png',
    './assets/images/ui/android-chrome-512x512.png',
    './assets/images/ui/HomeButton.png',
    './assets/images/ui/HomeButtonPressed.png',
    './assets/images/ui/particle1.png',
    './assets/images/ui/PauseButton.png',
    './assets/images/ui/PauseButtonPressed.png',
    './assets/images/ui/PlayButton.png',
    './assets/images/ui/PlayButtonpressed.png',
    './assets/images/ui/PlayButtonSmall.png',
    './assets/images/ui/PlayButtonSmallPressed.png',
    './assets/images/ui/RestartButton.png',
    './assets/images/ui/RestartButtonPressed.png',
    // Sounds
    './assets/sounds/boom3.wav',
    './assets/sounds/bounceSound.wav',
    // Levels JSON
    './levels.json',
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
