// Nama cache untuk cache dinamis
const DYNAMIC_CACHE = 'dynamic-cache-v1';

// Event 'install' untuk menginstal Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  // Anda bisa menambahkan cache statis di sini jika diperlukan
});

// Event 'activate' untuk membersihkan cache lama
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== DYNAMIC_CACHE) {
            console.log('Service Worker: Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Event 'fetch' untuk menangani permintaan dan cache secara dinamis
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Jika ada di cache, gunakan dari cache
      if (cachedResponse) {
        return cachedResponse;
      }

      // Jika tidak ada di cache, ambil dari network dan simpan di cache
      return fetch(event.request)
        .then((networkResponse) => {
          // Periksa jika response valid sebelum disimpan
          if (
            !networkResponse || 
            networkResponse.status !== 200 || 
            networkResponse.type !== 'basic'
          ) {
            return networkResponse;
          }

          // Clone response agar bisa dimasukkan ke cache
          const responseClone = networkResponse.clone();

          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(event.request, responseClone).catch((error) => {
              console.error('Service Worker: Cache put failed', error);
            });
            console.log('Service Worker: Resource cached:', event.request.url);
          });

          return networkResponse;
        })
        .catch((error) => {
          console.error('Service Worker: Fetch failed', error);
          // Anda bisa menambahkan fallback ke halaman offline di sini
          throw error;
        });
    })
  );
});
