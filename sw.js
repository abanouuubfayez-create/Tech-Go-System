// ─── Service Worker for Tech Go PWA ─────────────────────────────────────────
const CACHE_NAME = 'techgo-v8';
const STATIC_ASSETS = [
    './',
    './login.html',
    './index.html',
    './employee.html',
    './styles.css',
    './app.js',
    './auth.js',
    './firebase-config.js',
    './manifest.json',
    './flatpickr.min.css',
    './flatpickr.min.js'
];

// Install: cache static assets
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.filter(function(k) { return k !== CACHE_NAME; })
                    .map(function(k) { return caches.delete(k); })
            );
        })
    );
    self.clients.claim();
});

// Fetch: network first, fall back to cache
self.addEventListener('fetch', function(event) {
    // Skip Firebase/Google requests - always go to network
    if (event.request.url.indexOf('firebase') > -1 ||
        event.request.url.indexOf('googleapis') > -1 ||
        event.request.url.indexOf('gstatic') > -1) {
        return;
    }
    event.respondWith(
        fetch(event.request).then(function(response) {
            // Update cache with fresh response
            if (response && response.status === 200 && event.request.method === 'GET') {
                var resClone = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, resClone);
                });
            }
            return response;
        }).catch(function() {
            // Network failed — try cache
            return caches.match(event.request);
        })
    );
});

// Push notifications handler
self.addEventListener('push', function(event) {
    var data = {};
    try { data = event.data ? event.data.json() : {}; } catch(e) {}
    var title = data.title || 'تيك جو';
    var options = {
        body: data.body || 'لديك إشعار جديد',
        icon: './icon-192.png',
        badge: './icon-192.png',
        dir: 'rtl',
        lang: 'ar',
        vibrate: [200, 100, 200],
        tag: data.tag || 'techgo-notification',
        requireInteraction: false,
        data: { url: data.url || './login.html' }
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    var url = (event.notification.data && event.notification.data.url) || './login.html';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(cls) {
            for (var i = 0; i < cls.length; i++) {
                if (cls[i].url.indexOf(url) > -1 && 'focus' in cls[i]) {
                    return cls[i].focus();
                }
            }
            if (clients.openWindow) return clients.openWindow(url);
        })
    );
});
