// Minimal offline cache
const CACHE = "qingdan-plus-v2";
const ASSETS = [
  "/qingdan-plus/",
  "/qingdan-plus/index.html",
  "/qingdan-plus/manifest.json",
  "/qingdan-plus/logo-192.png",
  "/qingdan-plus/logo-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
