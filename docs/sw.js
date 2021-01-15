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
    event.waitUntil(caches.open(cacheName).then(async cache => {
        const res = await cache.match(event.request)
        const rres = fetch(event.request).then(res => {
            cache.put(event.request, res.clone())
            return res
        })

        event.respondWith(res || await rres.catch(() => cache.match('/offline.html')))
    })),
)
