/** @type {ServiceWorkerGlobalScope} */
const sw = globalThis

const cacheName = 'all'

sw.addEventListener('install', (/** @type {ExtendableEvent} */event) =>
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                '/offline.html',
            ])
        }),
    ),
)

sw.addEventListener('activate', (/** @type {ExtendableEvent} */event) => {
    event.waitUntil(Promise.all([
        caches.keys().then((names) => Promise.all(names.map((name) => {
            if (name === cacheName) return
            return caches.delete(name)
        }))),
        sw.registration.navigationPreload ? self.registration.navigationPreload.enable() : null,
    ]))
})

self.addEventListener('fetch', (/** @type {FetchEvent} */event) =>
    event.respondWith(caches.open(cacheName).then(async cache => {
        const preload = await Promise.resolve(event.preloadResponse).catch(() => null)
        const res = preload || await fetch(event.request).catch(() => null)
        if (!res) return await cache.match(event.request) || cache.match('/offline.html')

        cache.put(event.request, res.clone())
        return res
    })),
)
