/// <reference lib="webworker" />

const SW_VERSION = "1.2.0";
const CACHE_NAME = `tecweb-admin-v${SW_VERSION}`;

// Install: skip waiting immediately to activate new version
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: network-first for API, cache-first for static
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET and API requests
  if (event.request.method !== "GET" || url.pathname.startsWith("/api/")) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Push notification received
self.addEventListener("push", (event) => {
  let data = { title: "TecWeb Studio", body: "New notification" };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  // Keep options minimal for iOS Safari compatibility
  // iOS does not support: renotify, badge, vibrate, actions, image
  const options = {
    body: data.body,
    icon: "/icons/icon-192x192.png",
    tag: data.tag || "ticket-notification",
    data: {
      url: data.url || "/admin/dashboard",
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Click on notification -> open dashboard
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/admin/dashboard";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      // Focus existing window if available (on iOS this reopens the PWA)
      for (const client of clients) {
        if (client.url.includes("/admin") && "focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // Otherwise open new window
      return self.clients.openWindow(targetUrl);
    })
  );
});
