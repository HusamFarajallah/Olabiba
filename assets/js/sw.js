// Service Worker for Olabiba Platform - Performance Optimization
// Version 1.1.0 - Enhanced Caching

const CACHE_NAME = "olabiba-v1.2.0";
const STATIC_CACHE_NAME = "olabiba-static-v1.2.0";
const DYNAMIC_CACHE_NAME = "olabiba-dynamic-v1.2.0";

// Cache expiration times (in milliseconds)
const CACHE_EXPIRATION = {
  static: 30 * 24 * 60 * 60 * 1000, // 30 days for static assets
  images: 7 * 24 * 60 * 60 * 1000,   // 7 days for images
  external: 24 * 60 * 60 * 1000,     // 1 day for external resources
  html: 60 * 60 * 1000,               // 1 hour for HTML pages
};

// Critical assets to cache immediately - only existing files
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/index-en.html",
  "/index-es.html",
  "/faq.html",
  "/faq-en.html",
  "/faq-es.html",
  "/assets/css/tailwind-minimal.css",
  "/assets/css/style.css",
  "/assets/js/main.js",
  "/assets/img/Olabiba-logo-tagline.webp",
  "/assets/img/Characters2.webp",
];

// External resources to cache with long TTL
const EXTERNAL_ASSETS = [
  "https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;500;700&display=swap",
];

// Install event - cache critical assets
self.addEventListener("install", (event) => {
  console.log("🚀 Service Worker installing...");

  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log("📦 Caching static assets...");
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
        console.log("🌐 Caching external resources...");
        return cache.addAll(EXTERNAL_ASSETS);
      }),
    ])
      .then(() => {
        console.log("✅ Service Worker installed successfully");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("❌ Service Worker installation failed:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("🔄 Service Worker activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME
            ) {
              console.log("🗑️ Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("✅ Service Worker activated");
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Apply different caching strategies based on resource type
  if (isStaticAsset(request.url)) {
    // Static assets: Cache First (fastest loading)
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
  } else if (isExternalResource(request.url)) {
    // External resources: Stale While Revalidate (balance speed & freshness)
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE_NAME));
  } else if (isHTMLPage(request.url)) {
    // HTML pages: Network First (fresh content when online)
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
  } else {
    // Other requests: Network First
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
  }
});

// Cache First Strategy - Best for static assets with extended cache
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    
    // Check if cache is still valid
    if (cachedResponse) {
      const cachedDate = new Date(cachedResponse.headers.get('sw-cached-date'));
      const now = new Date();
      const age = now - cachedDate;
      
      // Determine max age based on resource type
      let maxAge = CACHE_EXPIRATION.static;
      if (request.url.match(/\.(png|webp|jpg|jpeg|svg)$/)) {
        maxAge = CACHE_EXPIRATION.images;
      }
      
      // Return cached response if still fresh
      if (age < maxAge) {
        return cachedResponse;
      }
    }

    // Fetch from network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      
      // Add timestamp to track cache age
      const responseToCache = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: new Headers(networkResponse.headers)
      });
      responseToCache.headers.append('sw-cached-date', new Date().toISOString());
      
      cache.put(request, responseToCache.clone());
      return networkResponse;
    }
    return networkResponse;
  } catch (error) {
    console.error("Cache first failed:", error);
    const fallback = await caches.match(request);
    return (
      fallback ||
      new Response("Offline - Asset not available", {
        status: 503,
        statusText: "Service Unavailable",
      })
    );
  }
}

// Network First Strategy - Best for HTML pages
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error("Network first failed:", error);
    const cachedResponse = await caches.match(request);
    return (
      cachedResponse ||
      new Response("Offline - Page not available", {
        status: 503,
        statusText: "Service Unavailable",
      })
    );
  }
}

// Stale While Revalidate Strategy - Best for external resources
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  // Update cache in background
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch((error) => {
      console.error("Background fetch failed:", error);
    });

  // Return cached version immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise;
}

// Helper functions to identify resource types
function isStaticAsset(url) {
  return (
    url.includes("/assets/") ||
    url.match(/\.(css|js|png|webp|jpg|jpeg|svg|ico|woff|woff2|ttf)$/)
  );
}

function isExternalResource(url) {
  return (
    url.includes("fonts.googleapis.com") ||
    url.includes("fonts.gstatic.com") ||
    url.includes("cdn.tailwindcss.com") ||
    url.includes("cdnjs.cloudflare.com")
  );
}

function isHTMLPage(url) {
  return (
    url.includes(".html") ||
    (!url.includes(".") && !url.includes("/assets/") && !url.includes("api/"))
  );
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log("🔄 Background sync triggered - handling offline actions");
  // Handle any queued offline actions when connection is restored
}

// Optional: Push notifications support
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/assets/img/Characters1.png",
      badge: "/assets/img/Olabiba-logo-tagline.png",
      data: data.url,
      actions: [
        {
          action: "open",
          title: "فتح التطبيق",
        },
        {
          action: "close",
          title: "إغلاق",
        },
      ],
    };

    event.waitUntil(
      self.registration.showNotification(data.title || "Olabiba", options)
    );
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open" || !event.action) {
    const urlToOpen = event.notification.data || "/";
    event.waitUntil(
      clients.matchAll({ type: "window" }).then((clientList) => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        // Open new window if not already open
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});

console.log("🎯 Service Worker loaded successfully - Ready for caching!");
