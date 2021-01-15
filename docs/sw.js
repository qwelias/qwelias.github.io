/* eslint-env serviceworker */

const cacheName = 'all'

self.addEventListener('install', (/** @type {ExtendableEvent} */event) =>
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                '/offline.html',
            ])
        }),
    ),
)

self.addEventListener('activate', (/** @type {ExtendableEvent} */event) => {
    event.waitUntil(caches.keys().then((names) => {
        return Promise.all(names.map((name) => {
            if (name === cacheName) return
            return caches.delete(name)
        }))
    }))
})

self.addEventListener('fetch', (/** @type {FetchEvent} */event) =>
    event.respondWith(caches.open(cacheName).then(async cache => {
        const [res, preload] = await Promise.all([
            cache.match(event.request),
            event.preloadResponse,
        ])
        const rres = fetch(event.request).then(res => {
            cache.put(event.request, res.clone())
            return res
        })

        return res || preload || await rres.catch(() => cache.match('/offline.html'))
    })),
)
